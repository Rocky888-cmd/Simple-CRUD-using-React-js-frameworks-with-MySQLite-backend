// App.jsx — the main component.
// It keeps the app state (records, form values, messages) and connects
// the form and the list to the Express API using the Fetch API.

import { useEffect, useState } from 'react';
import RecordForm from './components/RecordForm.jsx';
import RecordList from './components/RecordList.jsx';

// The Vite dev server forwards every request starting with /api
// to the Express backend at http://localhost:5000 (see vite.config.js).
const API_URL = '/api/records';

function App() {
  const [records, setRecords] = useState([]); // records loaded from SQLite
  const [form, setForm] = useState({ name: '', description: '', is_active: false });
  const [editingId, setEditingId] = useState(null); // id of the record being edited (null = adding)
  const [message, setMessage] = useState(''); // feedback message text
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
  const [loading, setLoading] = useState(true); // true while the first fetch is running

  // useEffect with an empty array runs ONCE when the app starts.
  // It loads the saved records from the backend (SQLite).
  useEffect(() => {
    fetchRecords();
  }, []);

  // Helper: fetch all records from the API and save them in state.
  // This is the "Read" part of CRUD.
  function fetchRecords() {
    return fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setRecords(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        showMessage('Could not connect to the server. Is the backend running?', 'error');
        setLoading(false);
      });
  }

  // Helper: show a feedback message for a few seconds.
  function showMessage(text, type = 'success') {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  }

  // Called by RecordForm when the user clicks "Add Record" or "Update".
  // This is the "Create" and "Update" part of CRUD.
  function handleSubmit() {
    if (!form.name.trim()) {
      showMessage('Please enter a name.', 'error');
      return;
    }

    // If we are editing, send PUT to /api/records/:id, otherwise POST to /api/records
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form), // sends { name, description, is_active } as JSON
    })
      .then((response) => response.json().then((body) => ({ ok: response.ok, body })))
      .then(({ ok, body }) => {
        if (!ok) throw new Error(body.message || 'Something went wrong');
        showMessage(body.message);
        // Clear the form after a successful add or update
        setForm({ name: '', description: '', is_active: false });
        setEditingId(null);
        return fetchRecords(); // refresh the list from the database
      })
      .catch((error) => showMessage(error.message, 'error'));
  }

  // Fill the form with the selected record's values so the user can edit them.
  function handleEdit(record) {
    setEditingId(record.id);
    setForm({
      name: record.name,
      description: record.description || '',
      // SQLite stores the checkbox as 1/0, but React checkboxes need true/false
      is_active: Boolean(record.is_active),
    });
  }

  // Delete a record after asking the user for confirmation.
  // This is the "Delete" part of CRUD.
  function handleDelete(record) {
    if (!window.confirm(`Are you sure you want to delete "${record.name}"?`)) return;

    fetch(`${API_URL}/${record.id}`, { method: 'DELETE' })
      .then((response) => response.json().then((body) => ({ ok: response.ok, body })))
      .then(({ ok, body }) => {
        if (!ok) throw new Error(body.message || 'Delete failed');
        showMessage(body.message);
        return fetchRecords(); // refresh the list
      })
      .catch((error) => showMessage(error.message, 'error'));
  }

  // Reset the form and stop editing.
  function handleCancel() {
    setEditingId(null);
    setForm({ name: '', description: '', is_active: false });
  }

  return (
    <main className="container">
      <h1>Simple CRUD Application</h1>

      {/* Feedback message shown after every operation */}
      {message && <p className={`message ${messageType}`}>{message}</p>}

      <RecordForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editing={editingId !== null}
      />

      <section className="records-section">
        <h2>Saved Records</h2>
        {loading ? (
          <p>Loading records...</p>
        ) : (
          <RecordList records={records} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </section>
    </main>
  );
}

export default App;
