
import { Search, RotateCcw } from "lucide-react";
import { formatLabel } from "../../utils/formatters";

export default function PatientFilters({
  filters,
  setFilters,
  options,
}) {
  function updateFilter(name, value) {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetFilters() {
    setFilters({
      search: "",
      ward: "",
      department: "",
      doctor: "",
    });
  }

  function renderOptions(values = []) {
    return values.map((value) => (
      <option key={value} value={value}>
        {formatLabel(value)}
      </option>
    ));
  }

  return (
    <div className="filters-panel">
      <div className="search-box">
        <Search size={19} />
        <input
          type="search"
          placeholder="Search patients by name..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
      </div>

      <select
        value={filters.ward}
        onChange={(e) => updateFilter("ward", e.target.value)}
      >
        <option value="">All Wards</option>
        {renderOptions(options.wards)}
      </select>

      <select
        value={filters.department}
        onChange={(e) => updateFilter("department", e.target.value)}
      >
        <option value="">All Departments</option>
        {renderOptions(options.departments)}
      </select>

      <select
        value={filters.doctor}
        onChange={(e) => updateFilter("doctor", e.target.value)}
      >
        <option value="">All Doctors</option>
        {renderOptions(options.doctors)}
      </select>

      <button
        type="button"
        className="reset-button"
        onClick={resetFilters}
        title="Reset filters"
      >
        <RotateCcw size={17} />
        Reset
      </button>
    </div>
  );
}
