import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { CiCirclePlus } from "react-icons/ci";

const ColorPicker = ({ onSelectColor }) => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colorHistory, setColorHistory] = useState([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleColorChange = (color) => {
    const newColor = color.hex;

    // Update current color
    setCurrentColor(newColor);

    const newHistory = [newColor, ...colorHistory.slice(0, 4)];
    setColorHistory(newHistory);

    localStorage.setItem("colorHistory", JSON.stringify(newHistory));

    onSelectColor(newColor);

    setIsColorPickerOpen(false);
  };

  useEffect(() => {
    const storedColorHistory = localStorage.getItem("colorHistory");
    if (storedColorHistory) {
      setColorHistory(JSON.parse(storedColorHistory));
    }
  }, []);

  return (
    <div>
      <div className="flex items-center">
        {colorHistory.length > 0 && (
          <div className="flex items-center">
            {colorHistory.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  cursor: "pointer",
                  borderRadius: "100%",
                }}
                className={`${
                  color === currentColor && "border-2 border-black"
                }`}
                onClick={() => {
                  setCurrentColor(color);
                  onSelectColor(color);
                  setIsColorPickerOpen(false);
                }}
              ></div>
            ))}
          </div>
        )}
        <button
          className="text-black"
          onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
        >
          <CiCirclePlus size={22} />
        </button>

      </div>
      {isColorPickerOpen && (
        <ChromePicker
          color={currentColor}
          className="absolute"
          onChange={handleColorChange}
        />
      )}
    </div>
  );
};

export default ColorPicker;
