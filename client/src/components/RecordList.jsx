// RecordList.jsx — displays all saved records.
// It uses TextView to show each record's information and a
// Button for the Edit and Delete actions.
// Props:
//   records: array of record objects (from the SQLite database)
//   onEdit:  called with the record when its Edit button is clicked
//   onDelete: called with the record when its Delete button is clicked

import Button from './Button.jsx';
import TextView from './TextView.jsx';

function RecordList({ records, onEdit, onDelete }) {
  // Friendly message when the database has no records yet
  if (records.length === 0) {
    return <p className="empty-message">No records found. Add your first record above!</p>;
  }

  return (
    <div className="record-list">
      {records.map((record) => (
        <div key={record.id} className="card record-card">
          <TextView label="Name" value={record.name} />
          <TextView label="Description" value={record.description || '—'} />
          <TextView
            label="Status"
            value={record.is_active ? 'Active' : 'Inactive'}
          />
          <div className="record-actions">
            <Button
              label="Edit"
              className="btn-edit"
              onClick={() => onEdit(record)}
            />
            <Button
              label="Delete"
              className="btn-delete"
              onClick={() => onDelete(record)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecordList;
