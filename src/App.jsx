import './App.css'

export default function App() {
  
  const Pesquisar = () => {

  }

  return(
    <div>
      <h1>Busca de Repositórios no github</h1>
      <input 
        type='text'
        placeholder='Digite o nome de usuário'
      />
      <button onClick={Pesquisar}>Pesquisar</button>
      <div>

        <div className='repositorio'>
          <div className='repositorioHeader'>
            <h2>Nome do repositório</h2>
            <a href='#' target='_blank' rel='noopener noreferrer'>Ver Repósitório</a>
          </div>
          <p>descrição do repositório</p>
        </div>

      </div>
    </div>
  )
}
