import Formulario from './components/Formulario';

import Card from './components/Card';
/*import canhaoEVO from './assets/avatar/canhaoEVO.png';
import espiritoGeloEVO from './assets/avatar/espiritoGeloEVO.png';
import esqueletosEVO from './assets/avatar/esqueletosEVO.png';
import exercitoEVO from './assets/avatar/exercitoEVO.png';
import megaCavaleiroEVO from './assets/avatar/megaCavaleiroEVO.png';
import walkiriaEVO from './assets/avatar/walkiriaEVO.png';
import arqueiroHeroi from './assets/avatar/arqueiroHeroi.png';
import barrilBarbaroHeroi from './assets/avatar/barrilBarbaroHeroi.avif';
import giganteHeroi from './assets/avatar/giganteHeroi.webp';
import goblinsHeroi from './assets/avatar/goblinsHeroi.png';
import miniPEKAheroi from './assets/avatar/miniPEKAheroi.webp';
import mosqueteiraHeroi from './assets/avatar/mosqueteiraHeroi.png';
import arqueiraCampeao from './assets/avatar/arqueiraCampeao.png';
import cavaleiroCampeao from './assets/avatar/cavaleiroCampeao.png';
import esqueletoCampeao from './assets/avatar/esqueletoCampeao.png';
import goblinCampeao from './assets/avatar/goblinCampeao.avif';
import mongeCampeao from './assets/avatar/mongeCampeao.png';
import principeCampeao from './assets/avatar/principeCampeao.avif';*/

import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    alert("Bem-vindo ao projeto Heros!")
  }, [])






  const [listaHerois, setListaHerois] = useState([]);


  useEffect(() => {
    async function buscarHerois() {
      try {
        const res = await fetch("http://localhost:5000/getHero");
        const data = await res.json();


        setListaHerois(data); // 🔥 aqui entra o banco
      } catch (error) {
        console.error("Erro ao buscar heróis:", error);
      }
    }

    buscarHerois();
  }, []);



  const [filtro, setFiltro] = useState("todos");

  const excluirHeroi = (id) => {
    setListaHerois(listaHerois.filter(heroi => heroi.id !== id));
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',

    justifyItems: 'center',
    fontFamily: 'sans-serif'
  }

  const heroisFiltrados = listaHerois.filter((heroi) => {
    if (filtro === "todos") return true;
    return heroi.classe === filtro;
  });



  return (
    <>



      <div style={{ textAlign: 'center' }}>
        <h1 className='underline text-3xl text-white'>Seleção de Heróis</h1>
      </div>

      <div style={{ textAlign: 'center', display: 'grid' }}>
        <h1 className='underline text-2xl text-white'>Recrute Seu Time</h1>
        <div className=' flex justify-center max-w gap-40'>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("todos")}>Todos</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("Heroi")}>Heróis</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("EVO")}>Evoluções</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("Campeão")}>Campeões</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'>Cadastrar</button>

        </div>


        <div style={containerStyle}>
          {heroisFiltrados.map((heroi) => (
            <Card
              key={heroi.id}
              heroi={heroi}
              excluirHeroi={excluirHeroi}
            />
          ))}
        </div>
      </div>

      <Formulario />

    </>
  );



}

export default App;