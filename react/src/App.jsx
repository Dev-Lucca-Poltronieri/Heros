import Formulario from './components/Formulario';
import Cadastro from './components/Cadastro';
import Card from './components/Card';
import Login from './components/Login.jsx';
import Profile from './components/Profile';

import axios from "axios";

import { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import Guilda from './components/Guilda';
import Missoes from './components/Missoes';

function App() {

  const [showSideBar, setShowSideBar] = useState(false)
  const [listaHerois, setListaHerois] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [coins, setCoins] = useState(0);
  const [firstComponent, setFirstComponent] = useState(() => {
    return localStorage.getItem("token") ? "home" : "login";
  });

  async function buscarHerois() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`http://localhost:5000/getHero`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } catch (error) {
      console.error("Erro ao buscar heróis:", error);
    }
  }

  async function buscarCoins() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/getCoins", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoins(data.coins);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const dadosFetch = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const resultado = await buscarHerois();
        setListaHerois(resultado || []);
        await buscarCoins();
      } catch (error) {
        console.error(error);
      }
    };
    dadosFetch();
  }, [firstComponent]);

  const [filtro, setFiltro] = useState("todos");

  async function excluirHeroi(id) {
    try {
      const res = await fetch(`http://localhost:5000/delete/${id}`, { method: "PATCH" });
      const data = await res.json();
      console.log(data);
      setListaHerois(prev => prev.filter(heroi => heroi.id !== id));
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

  if (firstComponent === 'login') return <Login setFirstComponent={setFirstComponent} />;
  if (firstComponent === 'cadastro') return <Cadastro setFirstComponent={setFirstComponent} />;
  if (firstComponent === 'guilda') return <Guilda setFirstComponent={setFirstComponent} />;
  if (firstComponent === 'missoes') return <Missoes setFirstComponent={setFirstComponent} setCoins={setCoins} />;
  if (firstComponent === 'profile') return <Profile setFirstComponent={setFirstComponent} />;

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <div className='text-center grid'>

            <div className='pb-4 pt-3 gap-2 grid text-center backdrop-blur-md rounded-lg shadow-md max-w'>
              <h1 className='text-3xl text-white'>Seleção de Heróis</h1>
              <h1 className='text-2xl text-white'>Recrute Seu Time</h1>

              <div className='gap-40 flex justify-center align-center'>
                <button
                  className='m-2.5 bg-cyan-600 text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => { setFiltro("todos"); setShowForm(false); }}>
                  Todos
                </button>

                <button
                  className='m-2.5 bg-cyan-600 text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => { setFiltro("Herói"); setShowForm(false); }}>
                  Heróis
                </button>

                <button
                  className='m-2.5 bg-cyan-600 text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => { setFiltro("EVO"); setShowForm(false); }}>
                  Evoluções
                </button>

                <button
                  className='m-2.5 bg-cyan-600 text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => { setFiltro("Campeão"); setShowForm(false); }}>
                  Campeões
                </button>

                <button
                  className='m-2.5 bg-cyan-600 text-white py-2 px-4 rounded w-50 font-[cinzel] font-bold text-xl'
                  onClick={() => setShowForm(prev => !prev)}>
                  Novo
                </button>
              </div>
            </div>

            {/* Coins */}
            <div className='flex w-full align-center px-5 gap-2 py-4'>
              <p className='text-xl font-bold text-amber-500'>Coins</p>
              <div className='h-8 w-16 bg-gray-100/50 rounded flex items-center justify-center'>
                <p className='font-bold text-amber-500'>{coins}</p>
              </div>
            </div>

            {/* Botão Hambúrguer */}
    
            <button
              onClick={() => setShowSideBar(!showSideBar)}
              className="fixed top-4 right-20 z-50 flex flex-col justify-center items-center gap-1.5 p-2 bg-black/30 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-black/50 transition"
            >
              <span className="block w-7 h-0.5 bg-white"></span>
              <span className="block w-7 h-0.5 bg-white"></span>
              <span className="block w-7 h-0.5 bg-white"></span>
            </button>

            {!showForm && (
              <div style={containerStyle}>
                {heroisFiltrados.map((heroi) => (
                  <Card key={heroi.id} heroi={heroi} excluirHeroi={excluirHeroi} />
                ))}
              </div>
            )}
          </div>

          {showForm && <Formulario onHeroSaved={buscarHerois} setListaHerois={setListaHerois} />}
        </div>

        {showSideBar && <SideBar setFirstComponent={setFirstComponent} />}
      </div>
    </>
  );
}

export default App;