import React, { useState, useEffect } from "react";

function CompleteOrNoComplete({ id }) {
  const storageKey = `check-apple-${id}`;

  const [isChecked, setIsChecked] = useState(() => {
    const savedCheck = localStorage.getItem(storageKey);
    return savedCheck === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, isChecked);
  }, [isChecked, storageKey]);

  const handleInputChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="checkbox-apple">
      <input
        className="yep"
        id={storageKey}
        type="checkbox"
        checked={isChecked}
        onChange={handleInputChange}
      />
      <label htmlFor={storageKey}></label>
    </div>
  );
}

export default CompleteOrNoComplete;
