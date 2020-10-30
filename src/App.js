import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);
  
  // executa função quando ha mudanca de estado
  useEffect(() => {
    // obtem dados da API
    api.get('repositories').then(response => {
      // atualiza estado da variavel
      setRepositories(response.data);
    });
  });

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      "title": `Repositorio ${Date.now()}`,
      "url": "url do repositorio 1",
      "techs": ['tech1','tech2','tech3']
    });  

    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
    	repository => repository.id !== id
     ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
