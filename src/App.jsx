import Formulario from './components/Formulario';

import Card from './components/Card';
import canhaoEVO from './assets/avatar/canhaoEVO.png';
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
import principeCampeao from './assets/avatar/principeCampeao.avif';

import { useState } from 'react';

function App() {

  const [listaHerois, setListaHerois] = useState([
    {
      id: 1,
      nome: 'Canhão',
      classe: 'EVO',
      imagem: canhaoEVO,
      tipo: "ausente"
    },
    {
      id: 2,
      nome: 'Espirito de Gelo',
      classe: "EVO",
      imagem: espiritoGeloEVO,
      tipo: "offline"
    },
    {
      id: 3,
      nome: 'Esqueletos',
      classe: 'EVO',
      imagem: esqueletosEVO,
      tipo: "online"
    },
    {
      id: 4,
      nome: 'Exercito de esqueletos',
      classe: 'EVO',
      imagem: exercitoEVO,
      tipo: "online"
    },
    {
      id: 5,
      nome: 'Mega Cavaleiro',
      classe: 'EVO',
      imagem: megaCavaleiroEVO,
      tipo: "ausente"
    },
    {
      id: 6,
      nome: 'Walkiria',
      classe: 'EVO',
      imagem: walkiriaEVO,
      tipo: "offline"
    },

    {
      id: 7,
      nome: 'Arqueiro Mágico',
      classe: 'Heroi',
      imagem: arqueiroHeroi,
      tipo: "offline"
    },


    {
      id: 8,
      nome: 'Barril de Barbaro',
      classe: 'Heroi',
      imagem: barrilBarbaroHeroi,
      tipo: "ausente"
    },


    {
      id: 9,
      nome: 'Gigante',
      classe: 'Heroi',
      imagem: giganteHeroi,
      tipo: "offline"
    },


    {
      id: 10,
      nome: 'Goblins',
      classe: 'Heroi',
      imagem: goblinsHeroi,
      tipo: "online"
    },


    {
      id: 11,
      nome: 'Mini P.E.K.A',
      classe: 'Heroi',
      imagem: miniPEKAheroi,
      tipo: "online"
    },


    {
      id: 12,
      nome: 'Mosqueteira',
      classe: 'Heroi',
      imagem: mosqueteiraHeroi,
      tipo: "ausente"
    },

    {
      id: 13,
      nome: 'Rainha Arqueira',
      classe: 'Campeão',
      imagem: arqueiraCampeao,
      tipo: "online"
    },


    {
      id: 14,
      nome: 'Cavaleiro',
      classe: 'Campeão',
      imagem: cavaleiroCampeao,
      tipo: "ausente"
    },


    {
      id: 15,
      nome: 'Rei Esqueleto',
      classe: 'Campeão',
      imagem: esqueletoCampeao,
      tipo: "offline"
    },


    {
      id: 16,
      nome: 'Goblin Stein',
      classe: 'Campeão',
      imagem: goblinCampeao,
      tipo: "online"
    },


    {
      id: 17,
      nome: 'Monge',
      classe: 'Campeão',
      imagem: mongeCampeao,
      tipo: "online"
    },


    {
      id: 18,
      nome: 'Pequeno Príncipe',
      classe: 'Campeão',
      imagem: principeCampeao,
      tipo: "ausente"
    },





  ]);



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
        <div className=' flex justify-center max-w gap-55'>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("todos")}>Todos</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("Heroi")}>Heróis</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("EVO")}>Evoluções</button>
          <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl' onClick={() => setFiltro("Campeão")}>Campeões</button>

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
  )
}

export default App;