import Formulario from './components/Formulario';
import Cadastro from './components/Cadastro';
import Card from './components/Card';
import Login from './components/Login';
 import axios from "axios";
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

  const [listaHerois, setListaHerois] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [firstComponent, setFirstComponent] = useState('login')



  async function buscarHerois() {
  try {
    const userId = localStorage.getItem("userId");

    const { data } = await axios.get(
      `http://localhost:5000/getHero/${userId}`
    );

    return data;

  } catch (error) {
    console.error("Erro ao buscar heróis:", error);
  }
}


  const Teste = () => { // melhor para chamar mais de uma função
    useEffect(() => {
      const dadosFetch = async () => {
        try {
          const resultado = await buscarHerois();
          setListaHerois(resultado);
        } catch (error) {
          console.error("Erro!");
        }
      }

      dadosFetch();
    }, []);
  }


  Teste();





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
    return heroi.classe === filtro;
  });


  if (firstComponent === 'login') {
    return <Login setFirstComponent={setFirstComponent} />;
  }

  if (firstComponent === 'cadastro') {
    return <Cadastro setFirstComponent={setFirstComponent} />;
  }


  return (

    <>











      <div style={{ textAlign: 'center' }}>
        <h1 className='underline text-3xl text-white'>Seleção de Heróis</h1>
      </div>

      <div style={{ textAlign: 'center', display: 'grid' }}>
        <h1 className='underline text-2xl text-white'>Recrute Seu Time</h1>
        <div className=' flex justify-center max-w gap-40'>
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

      {showForm && <Formulario />}




    </>
  );



}

export default App;