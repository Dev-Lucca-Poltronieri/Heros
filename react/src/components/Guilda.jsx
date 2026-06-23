import logoClash from '../assets/logo.png';
import CardGuilda from './CardGuilda';
import FormGuilda from './FormGuilda';
import { useState } from 'react';

function Guilda({ setFirstComponent }) {
    const [filtro, setFiltro] = useState("todos");

    return (
        <div className="flex flex-col h-screen ">

            {/* Header fixo */}
            <div className="fixed top-0 left-0 w-full z-40 ">
                <div className="flex justify-center align-center backdrop-blur-sm h-40 w-full">
                    <img className='h-40' src={logoClash} alt="Logo Clash Royale" />
                </div>

                <div className="flex gap-5 px-5">
                    <button
                        className={`border-t-4 w-full text-xl font-bold cursor-pointer pb-1
                        ${filtro === "minha" ? "border-gray-700 bg-gray-400/60 text-gray-700" : "border-gray-400/60 bg-gray-700/40 text-gray-400"}`}
                        onClick={() => setFiltro("minha")}
                    >
                        Minha Guilda
                    </button>
                    <button
                        className={`border-t-4 w-full text-xl font-bold cursor-pointer pb-1
                        ${filtro === "todos" ? "border-gray-700 bg-gray-400/60 text-gray-700" : "border-gray-400/60 bg-gray-700/40 text-gray-400"}`}
                        onClick={() => setFiltro("todos")}
                    >
                        Guildas
                    </button>
                </div>

                <div className='w-full px-6 py-5 flex justify-between'>
                    <button
                        onClick={() => setFirstComponent("home")}
                        className='cursor-pointer px-4 py-2 rounded-2xl text-xl font-bold text-gray-100 bg-gray-700 hover:bg-gray-600'
                    >
                        Voltar
                    </button>

                    {filtro === "minha" && (
                        <button
                            onClick={() => setFiltro("nova")}
                            className='cursor-pointer px-4 py-2 pt-1 rounded-2xl text-xl font-bold text-gray-100 bg-amber-700 hover:bg-amber-600'
                        >
                            + Guilda
                        </button>
                    )}
                </div>
            </div>

            {/* Conteúdo com padding para não ficar atrás do header */}
            <div className="mt-[300px] overflow-y-auto">
                {filtro === "nova"
                    ? <FormGuilda setFiltro={setFiltro} />
                    : <CardGuilda filtro={filtro} setFiltro={setFiltro} />
                }
            </div>

        </div>
    );
}

export default Guilda;