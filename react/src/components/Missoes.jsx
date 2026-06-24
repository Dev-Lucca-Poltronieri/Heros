import logoClash from '../assets/logo.png';
import CardMissao from './CardMissao';
import { useState } from 'react';
import axios from 'axios';

function Missoes({ setFirstComponent, setCoins }) {
    const [filtro, setFiltro] = useState("missoes");
    const [refresh, setRefresh] = useState(0);

    async function ativarMissao() {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://localhost:5000/ativarMissao`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error("Erro ao ativar missão", error);
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="fixed top-0 left-0 w-full z-40">
                <div className="flex justify-center align-center backdrop-blur-sm h-40 w-full">
                    <img className='h-40' src={logoClash} alt="Logo Clash Royale" />
                </div>

                <div className="flex gap-5 px-5">
                    <button
                        className={`border-t-4 w-full text-xl font-bold cursor-pointer pb-1
                        ${filtro === "missoes" ? "border-gray-700 bg-gray-400/60 text-gray-700" : "border-gray-400/60 bg-gray-700/40 text-gray-400"}`}
                        onClick={() => setFiltro("missoes")}
                    >
                        Missões
                    </button>
                    <button
                        className={`border-t-4 w-full text-xl font-bold cursor-pointer pb-1
                        ${filtro === "completas" ? "border-gray-700 bg-gray-400/60 text-gray-700" : "border-gray-400/60 bg-gray-700/40 text-gray-400"}`}
                        onClick={() => setFiltro("completas")}
                    >
                        Completas
                    </button>
                </div>

                <div className='w-full px-6 py-5 flex justify-between'>
                    <button
                        onClick={() => setFirstComponent("home")}
                        className='cursor-pointer px-4 py-2 rounded-2xl text-xl font-bold text-gray-100 bg-gray-700 hover:bg-gray-600'
                    >
                        Voltar
                    </button>
                    <button
                        onClick={() => ativarMissao()}
                        className="cursor-pointer px-6 py-2 rounded-2xl text-xl font-bold text-gray-100 bg-green-700 hover:bg-green-600"
                    >
                        + Nova Missão
                    </button>
                </div>
            </div>

            <div className="mt-75 overflow-y-auto">
                <CardMissao filtro={filtro} setFiltro={setFiltro} refresh={refresh} setCoins={setCoins} />
            </div>
        </div>
    );
}

export default Missoes;