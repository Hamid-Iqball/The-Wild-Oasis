import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  //Adding it to the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChnage(e) {
    searchParams.set("sort By", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChnage}
    />
  );
}

export default SortBy;
