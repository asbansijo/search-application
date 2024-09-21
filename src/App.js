// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {

//   const [apiData, setapiData] = useState('');
//   const [error, setError] = useState(null);
//   useEffect(() => {
  
//     const fetchData = async () => {
        
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
//         setapiData(response.data);
//         // console.log(response.data);
//         setError(null);
//       } catch (error) {
//         console.error('Error fetching data', error);
//         setError('Failed to fetch data. Please try again later.');
//       }
//     };
  
//     fetchData();
//   }, []);

//   return (
//     <div className="App">

//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setApiData(response.data);
        setFilteredData(response.data); 
        console.log(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setInputError(''); 
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setInputError('Please search');
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = apiData.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    setFilteredData(filtered);

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  return (
    <div className="App">
      <h1>Search App</h1>

      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        {inputError && <div className="error">{inputError}</div>}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="search-app">
        {noResults ? (
          <p>No results found.</p>
        ) : (
          <ol style={{listStyle: 'none'}}>
            {filteredData.map((item) => (
              <li key={item.id}>
                {item.title} 
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default App;
