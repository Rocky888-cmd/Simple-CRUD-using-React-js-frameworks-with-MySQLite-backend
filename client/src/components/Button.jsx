// Button.jsx — a reusable button.
// Props:
//   label:     text shown on the button
//   onClick:   function to call when the button is clicked
//   className: extra CSS class for styling (e.g. "btn-primary", "btn-delete")
//   type:      button type ("button" by default, "submit" inside a form)

function Button({ label, onClick, className = '', type = 'button' }) {
  return (
    <button type={type} className={`btn ${className}`.trim()} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
