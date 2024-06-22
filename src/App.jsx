import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [username, setUsername] = useState('T8ninho');
  const [repositorio, setRepositorio] = useState([]);
  const [userData, setUserData] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [error, setError] = useState('');

  const Pesquisar = async () => {
    setCarregando(true);
    setError('');
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error('Usuário não encontrado');
      }
      const userData = await userResponse.json();
      setUserData(userData);

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposData = await reposResponse.json();
      setRepositorio(reposData);
    } catch (error) {
      console.error(error);
      setError('Usuário não encontrado');
      setUserData(null);
      setRepositorio([]);
    }
    setCarregando(false);
  };

  useEffect(() => {
    Pesquisar();
  }, []);

  const EnterPress = (event) => {
    if (event.key === 'Enter') {
      Pesquisar();
    }
  };

  return (
    <div className='App'>
      <h1>Busca de Repositórios no GitHub</h1>
      <input 
        type="text"
        value={username}
        onKeyDown={EnterPress}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite o nome de usuário"
      />
      <button onClick={Pesquisar}>Pesquisar</button>
      {carregando && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <div className="container">
        {userData && !error && (
          <div>
            <div className="userImage">
              <img src={userData.avatar_url} alt="Avatar"/>
            </div>
            <h2>{userData.name || userData.login}</h2>
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">@{userData.login}</a>
            <p>{userData.bio}</p>
          </div>
        )}
        {repositorio.length > 0 && !error && repositorio.map((item) => (
          <div className="repositorio" key={item.id}>
            <div className="repositorioHeader">
              <h2>{item.name}</h2>
              <a href={item.html_url} target="_blank" rel="noopener noreferrer">Ver Repositório</a>
            </div>
            {item.description ? (<><hr /> <p>{item.description}</p></>) : ''}
          </div>
        ))}
      </div>
      <div className='Footer'>
            <div>
             <p>© 2024 | Feito com <d>❤</d> por </p>
             <a href='http://t8ninho.com/'>T8ninho</a>
            </div>
        </div>
    </div>
  );
}
