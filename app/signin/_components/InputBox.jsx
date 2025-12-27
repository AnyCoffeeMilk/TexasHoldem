import { useRef } from "react";

export default function InputBox({ onChange, value, type }) {
  const inputRef = useRef(null);
  
  const handleChange = (e) => onChange(e.target.value)

  return (
    <div
      className="border-dark z-10 cursor-text rounded-sm border-2 px-4 py-2 text-lg"
      onClick={() => inputRef.current.focus()}
    >
      <input
        ref={inputRef}
        type={type}
        className="selection:text-light selection:bg-dark w-full"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
