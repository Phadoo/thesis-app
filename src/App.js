import "./App.css";
import "@fontsource/inter";
import { useState, useEffect } from 'react';

import StatisticsPage from "./pages/StatisticsPage";

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch(http)
  },[])

  return (
    <div className="container">
      <StatisticsPage />
    </div>
  );
}

export default App;
