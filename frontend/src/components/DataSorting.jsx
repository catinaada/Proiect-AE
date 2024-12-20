import { sortingOptions } from "../constants/sort";

const DataSorting = (props) => {
  const { setSorting } = props;

  const handleSortingChange = (event) => {
    setSorting(Number(event.target.value));
  };

  return (
    <div className="dataSortingWrapper">
      <label htmlFor="sortSelect" className="dataSortingLabel">
        Sortare după:
      </label>
      <select id="sortSelect" onChange={handleSortingChange} className="dataSortingSelect">
        {sortingOptions?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DataSorting;
