import { useFilters } from "../context/FilterContext";

function FilterButtons() {
  const { filter, setFilter } = useFilters();

  const filterOptions = [
    { value: "all", label: "Wszystkie" },
    { value: "active", label: "Aktywne" },
    { value: "completed", label: "Ukończone" },
  ];

  return (
    <div className="filter-buttons" style={{ marginBottom: "20px" }}>
      {filterOptions.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          style={{
            margin: "0 5px",
            backgroundColor: filter === value ? "#646cff" : "#1a1a1a",
            color: "white",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
