import { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleMenu}>
        {isOpen ? "닫기" : "메뉴"}
      </button>
      <div className={`dropdown ${isOpen ? "active" : ""}`}>
        {/* ... existing dropdown content ... */}
      </div>
    </>
  );
}

export default Dropdown;
