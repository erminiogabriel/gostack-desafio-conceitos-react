import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(respose => {
          console.log(respose);
          setRepositories(respose.data)
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Criando",
      "url": "movitech.com",
      "techs": "php"
     });
    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const newRepos = repositories.filter((repo) => repo.id !== id);
 
    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
        <li key={repo.id}>{repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li> ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
