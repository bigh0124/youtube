import "./App.css";
import Table from "./Table";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const debounce = useCallback(
    _.debounce((value) => setQuery(value), 500),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
    };

    fetchData();
  }, [query]);

  return (
    <div className="app">
      <input type="text" className="search" placeholder="Search" onChange={(e) => debounce(e.target.value)} />
      <ul className="list">
        <Table data={data} />
      </ul>
    </div>
  );
};

export default App;
