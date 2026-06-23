import logoClash from '../assets/logo.png';
import CardGuilda from './CardGuilda'
import { useState } from 'react';

function Guilda({ setFirstComponent }) {
    const [filtro, setFiltro] = useState("todos");

    return (
        <>
            <div className="flex justify-center align-center h-40 w-full">
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
            </div >

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

            <CardGuilda filtro={filtro} setFiltro={setFiltro} />
        </>
    );
}

export default Guilda;