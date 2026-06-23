import logoClash from '../assets/logo.png';
import CardGuilda from './CardGuilda'
import { useState } from 'react';

function Guilda() {
     const [listaGuildas, setListaGuildas] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    const guildasFiltradas = listaGuildas.filter((guilda) => {
        if (filtro === "todas") return true;
        return guilda.class === filtro;
    });


    return (
        <>
            <div className=" flex justify-center align-center h-40 w-full">
                <img className='h-40' src={logoClash} alt="Logo Clash Royale" />
            </div>
            <div className="flex gap-5 px-5">
                <button 
                    className="border-t-4 border-gray-700 w-full bg-gray-400/60 text-xl text-gray-700 font-bold cursor-pointer"
                    onClick={() => {
                    setFiltro("minha")}}
                    >
                    Minha Guilda
                </button>
                <button 
                    className="border-t-4 border-gray-700 w-full bg-gray-400/60 text-xl text-gray-700 font-bold cursor-pointer"
                    onClick={() => {
                    setFiltro("todos")}}
                    >
                    Guildas
                </button>
            </div>

            <div className='w-full px-6 py-5'>
                <p className='text-xl font-bold underline text-blue-300' >Voltar</p>
            </div>
            <CardGuilda />

        </>
    )

}

export default Guilda;