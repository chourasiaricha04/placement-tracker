import { FaSearch } from "react-icons/fa";
import "../styles/searchbar.css";

function SearchBar({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="search-container">

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>

    </div>
  );
}

export default SearchBar;