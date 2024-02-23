import React from "react";

type CountryProps = {
  index: number;
  country: { name: string; cities: string[] };
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export default function Country({
  index,
  country,
  isSelected,
  onClick,
  onDelete,
}: CountryProps) {
  return (
    <li
      className={isSelected ? "list-group-item active" : "list-group-item"}
      onClick={onClick}
    >
      <div className="d-flex justify-content-between align-items-center">
        <span>{index}</span>
        <span>{country.name}</span>
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
