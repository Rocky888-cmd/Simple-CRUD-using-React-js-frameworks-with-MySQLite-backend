// RecordForm.jsx — combines Input, Checkbox and Button.
// It is used for BOTH adding a new record and editing an existing one.
// Props:
//   form:      current form values (object kept in App's state)
//   setForm:   function that updates those values
//   onSubmit:  called when the form is submitted (Add or Update)
//   onCancel:  called when the Cancel button is clicked (editing only)
//   editing:   true when the user is editing an existing record

import Input from './Input.jsx';
import Checkbox from './Checkbox.jsx';
import Button from './Button.jsx';

function RecordForm({ form, setForm, onSubmit, onCancel, editing }) {
  // These handlers update the shared form state in App.jsx (controlled inputs)
  function handleNameChange(event) {
    setForm({ ...form, name: event.target.value });
  }

  function handleDescriptionChange(event) {
    setForm({ ...form, description: event.target.value });
  }

  function handleActiveChange(event) {
    // event.target.checked is a boolean (true/false)
    setForm({ ...form, is_active: event.target.checked });
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    onSubmit(); // App.jsx decides whether this is an Add (POST) or Update (PUT)
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit Record' : 'Add New Record'}</h2>

      <Input
        label="Name"
        name="name"
        placeholder="Enter a name"
        value={form.name}
        onChange={handleNameChange}
      />

      <Input
        label="Description"
        name="description"
        placeholder="Enter a description"
        value={form.description}
        onChange={handleDescriptionChange}
      />

      <Checkbox
        label="Active"
        checked={form.is_active}
        onChange={handleActiveChange}
      />

      <div className="form-actions">
        <Button
          label={editing ? 'Update' : 'Add Record'}
          type="submit"
          className="btn-primary"
        />
        {editing && (
          <Button label="Cancel" onClick={onCancel} className="btn-cancel" />
        )}
      </div>
    </form>
  );
}

export default RecordForm;
