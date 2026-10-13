// TextView.jsx — a reusable component for DISPLAYING text.
// Use it to show saved record information (it only reads values, never edits).
// Props:
//   label: text shown in bold (e.g. "Name")
//   value: the value to display (e.g. the record's name)

function TextView({ label, value }) {
  return (
    <p className="text-view">
      <strong>{label}:</strong> {value}
    </p>
  );
}

export default TextView;
