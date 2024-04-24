import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";

const baseUrl =
  "https://fsa-puppy-bowl.herokuapp.com/api/2402-FTB-ET-WEB-FT/players";

function PlayerDetails({ player }) {
  return (
    <div>
      <h2>Player Details</h2>
      <p>Name: {player.name}</p>
      <Link to="/">Go Back</Link>
    </div>
  );
}

function App() {
  const [players, setPlayers] = useState([]);
  const [searchKws, setsearchKws] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setPlayers(data.data.players);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchKws.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setsearchKws(event.target.value);
  };

  return (
    <Router>
      <div>
        <h1>All Puppies</h1>
        <input
          type="text"
          placeholder="Search for a player"
          value={searchKws}
          onChange={handleSearchChange}
        />
        <ul>
          {filteredPlayers.map((player) => (
            <li key={player.id}>
              {player.name}{" "}
              <Link to={`/player/${player.id}`}>See Details</Link>
            </li>
          ))}
        </ul>
        {filteredPlayers.map((player) => (
          <Router key={player.id} path={`/player/${player.id}`}>
            <PlayerDetails player={player} />
          </Router>
        ))}
      </div>
    </Router>
  );
}

export default App;
