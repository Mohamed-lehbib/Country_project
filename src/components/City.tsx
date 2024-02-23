import React from "react";

type CityProps = {
  city: string;
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export default function City({
  city,
  isSelected,
  onClick,
  onDelete,
}: CityProps) {
  return (
    <li
      className={isSelected ? "list-group-item active" : "list-group-item"}
      onClick={onClick}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span>{city}</span>
        {isSelected && (
          <button
            className="btn btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <span className="bi bi-trash"></span>
          </button>
        )}
      </div>
    </li>
  );
}
