function FilterButtons({ currentFilter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filter-buttons" style={{ marginBottom: "20px" }}>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{
            margin: "0 5px",
            backgroundColor: currentFilter === f ? "#646cff" : "#1a1a1a",
            color: "white",
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
