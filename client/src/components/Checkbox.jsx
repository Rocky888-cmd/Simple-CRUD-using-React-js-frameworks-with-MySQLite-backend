// Checkbox.jsx — a reusable checkbox with a label.
// It is a CONTROLLED component: checked comes from props,
// and every change is sent to the parent through onChange.
// Props:
//   label:   text shown next to the checkbox
//   checked: boolean — is the box checked?
//   onChange: function called when the checkbox is toggled

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="checkbox-field">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default Checkbox;
