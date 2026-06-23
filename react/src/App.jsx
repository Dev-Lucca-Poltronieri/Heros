import Formulario from './components/Formulario';
import Cadastro from './components/Cadastro';
import Card from './components/Card';
import Login from './components/Login';

import axios from "axios";
import icon from './assets/avatar/conf.png'
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
import SideBar from './components/SideBar';
import Guilda from './components/Guilda';

function App() {

  const [showSideBar, setShowSideBar] = useState(false)
  const [listaHerois, setListaHerois] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [firstComponent, setFirstComponent] = useState(() => {
    return localStorage.getItem("token") ? "home" : "login";
  });



  async function buscarHerois() {
    try {
      const token = localStorage.getItem("token");


      const { data } = await axios.get(
        `http://localhost:5000/getHero`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;

    } catch (error) {
      console.error("Erro ao buscar heróis:", error);
    }
  }



  useEffect(() => {
    const dadosFetch = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const resultado = await buscarHerois();
        setListaHerois(resultado || []);
      } catch (error) {
        console.error(error);
      }
    };

    dadosFetch();
  }, []);











  const [filtro, setFiltro] = useState("todos");

  async function excluirHeroi(id) {

    try {

      const res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "PATCH"
      });

      const data = await res.json();

      console.log(data);

      setListaHerois(prev =>
        prev.filter(heroi => heroi.id !== id)
      );

    } catch (error) {

      console.error("Erro ao excluir herói:", error);

    }

  }

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',

    justifyItems: 'center',
    fontFamily: 'sans-serif'
  }

  const heroisFiltrados = listaHerois.filter((heroi) => {
    if (filtro === "todos") return true;
    return heroi.class === filtro;
  });


  if (firstComponent === 'login') {
    return <Login setFirstComponent={setFirstComponent} />;
  }

  if (firstComponent === 'cadastro') {
    return <Cadastro setFirstComponent={setFirstComponent} />;
  }

  if (firstComponent === 'guilda') {
    return <Guilda setFirstComponent={setFirstComponent} />;
  }

  if (firstComponent === 'missoes') {
    return <div>Missões em breve...</div>;
  }

  if (firstComponent === 'profile') {
    return <div>Profile em breve...</div>;
  }




  return (

    <>






      {<div className="flex">
        <div className="flex-1">

          <div className='text-center grid'>

            <div className='pb-4 pt-3 gap-2 grid text-center  backdrop-blur-md rounded-lg shadow-md max-w '>
              <h1 className=' text-3xl text-white'>Seleção de Heróis</h1>
              <h1 className='text-2xl text-white'>Recrute Seu Time</h1>
              <div className='gap-40 flex justify-center align-center'>
                <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => {
                    setFiltro("todos");
                    setShowForm(false);
                  }}
                >
                  Todos
                </button>

                <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => {
                    setFiltro("Heroi");
                    setShowForm(false);
                  }}
                >
                  Heróis
                </button>

                <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => {
                    setFiltro("EVO");
                    setShowForm(false);
                  }}
                >
                  Evoluções
                </button>

                <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => {
                    setFiltro("Campeão");
                    setShowForm(false);
                  }}
                >
                  Campeões
                </button>
                <button className='m-2.5 bg-cyan-600  text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => setShowForm(prev => !prev)}>Novo</button>
              </div>



            </div>

            <div className='pt-3 pr-15 flex justify-end align-center'>
              <button
                onClick={() => setShowSideBar(!showSideBar)}>
                <img src={icon} alt="SideBar" className='h-10 cursor-pointer' />
              </button>
            </div>




            {!showForm && (
              <div style={containerStyle}>
                {heroisFiltrados.map((heroi) => (
                  <Card
                    key={heroi.id}
                    heroi={heroi}
                    excluirHeroi={excluirHeroi}
                  />
                ))}
              </div>
            )}
          </div>

          {showForm && <Formulario onHeroSaved={buscarHerois} setListaHerois={setListaHerois} />}

        </div>

        {showSideBar && <SideBar setFirstComponent={setFirstComponent} />}
      </div>}

      {/*<Guilda />*/}
    </>
  );



}

export default App;