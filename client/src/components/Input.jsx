// Input.jsx — a reusable text input with a label.
// It is a CONTROLLED component: the value comes from props,
// and every change is sent to the parent through onChange.
// Props:
//   label:       text shown above the input
//   name:        input name attribute
//   placeholder: hint text shown when the input is empty
//   value:       current value (controlled by the parent's state)
//   onChange:    function called when the text changes

function Input({ label, name, placeholder, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
