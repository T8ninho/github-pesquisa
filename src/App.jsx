import { useState } from 'react'
import './App.css'

export default function App() {
  const [username, setUsername] = useState('');
  const [repositorio, setRepositorio] = useState([]);
  const [userData, setUserData] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const Pesquisar = async () => {
    setCarregando(true);
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
      setUserData(null);
      setRepositorio([]);
    }
    setCarregando(false);
  };

  return(
    <div>
      <h1>Busca de Repositórios no github</h1>
      <input 
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Digite o nome de usuário'
      />
      <button onClick={Pesquisar}>Pesquisar</button>
      {carregando && <p>Carregando...</p>}
      <div className='container'>
        
        {userData && (
          <div>
            <img src={userData.avatar_url} alt='Avatar' width='300' height='300'/>
            <h2>{userData.name || userData.login}</h2>
            <a href={userData.html_url} target='_blank' rel='noopener noreferrer'>@{userData.login}</a>
            <p>{userData.bio}</p>
          </div>
        )}
        {repositorio.map((item) => (
          <div className='repositorio' key={item.id}>
            <div className='repositorioHeader'>
              <h2>{item.name}</h2>
              <a href={item.html_url} target='_blank' rel='noopener noreferrer'>Ver Repósitório</a>
            </div>
            {item.description ? (<><hr /> <p>{item.description}</p></>) : ''}
          </div>
        ))}

      </div>
    </div>
  );
}
