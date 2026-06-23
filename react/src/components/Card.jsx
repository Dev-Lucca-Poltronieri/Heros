import { useState } from "react";
import StatusBadge from "./StatusBadge";

import defaultImage from "../assets/avatar/defaultImage.png"


function Card({ heroi, excluirHeroi }) {

    

    const [isSelected, setIsSelected] = useState(false);

    const mensagem = () => {
        alert(`${heroi.name} selecionado com sucesso`)
    }

    const excluir = () => {
        excluirHeroi(heroi.id)
    }

    const [xp, setXp] = useState(0);
    const [nivel, setNivel] = useState(0);


   

    if (xp === 110) {
        setXp(0);
        setNivel(nivel + 1);

    }

    if (xp === 100) {
        // cor = "border-amber-300";
    }





    function corBorda() {
        if (isSelected == true && heroi.class == 'EVO') {
            return 'border-2 border-purple-600 drop-shadow-[0_0_15px_#9333ea] transition-all duration-300'
        } else if (isSelected == true && heroi.class == 'Heroi') {
            return 'border-2 border-amber-400 drop-shadow-[0_0_15px_#f59e0b] transition-all duration-300'
        } else if (isSelected == true && heroi.class == 'Campeão') {
            return 'border-2 border-green-500  drop-shadow-[0_0_15px_#22c55e] transition-all duration-300'
        } else {
            return 'border-2 border-gray-200 shadow-sm transition-all duration-300'
        }
    }




    function corClasse() {
        if (heroi.class == 'EVO') {
            return "text-purple-400 drop-shadow-[0_0_15px_#9333ea]"
        } else if (heroi.class == 'Heroi') {
            return "text-amber-500 drop-shadow-[0_0_15px_#f59e0b]"
        } else if (heroi.class == 'Campeão') {
            return "text-green-500  drop-shadow-[0_0_15px_#22c55e]"
        } else {
            return "";
        }
    }

    function corBarra() {
        if (heroi.class == 'EVO') {
            return " bg-purple-600 drop-shadow-[0_0_5px_#9333ea]"
        } else if (heroi.class == 'Heroi') {
            return "bg-amber-400  drop-shadow-[0_0_5px_#f59e0b]"
        } else if (heroi.class == 'Campeão') {
            return "bg-green-500  drop-shadow-[0_0_5px_#22c55e]"
        } else {
            return "";
        }
    }

    function corBotao() {
        if (heroi.class == 'EVO') {
            return " bg-purple-600"
        } else if (heroi.class == 'Heroi') {
            return "bg-amber-400"
        } else if (heroi.class == 'Campeão') {
            return "bg-green-500"
        } else {
            return "";
        }
    }

    function corFundoCard() {
        if (heroi.class == 'EVO') {
            return " bg-blue-900"
        } else if (heroi.class == 'Heroi') {
            return "bg-amber-900"
        } else if (heroi.class == 'Campeão') {
            return "bg-green-900"
        } else {
            return "";
        }
    }

    function corNomePersonagem() {
        if (heroi.class == 'EVO') {
            return " text-purple-200 text-xl"
        } else if (heroi.class == 'Heroi') {
            return "text-amber-300 text-xl"
        } else if (heroi.class == 'Campeão') {
            return "text-green-300 text-xl"
        } else {
            return "";
        }
    }


    const imageNotFound = 'Image Not Found'




    return (
        <div className="">

            <div
                onClick={() => setIsSelected(!isSelected)}
                className={` ${corFundoCard()} border-4  rounded-xl p-4 m-2.5 shadow-md text-center w-70 h-165 ${corBorda()}`}>

                <h2 className={` font-[cinzel] text-2xl  font-semibold ${corClasse()}`}>{heroi.class}</h2>
                <StatusBadge tipo={heroi.status} />

                <div className="text-white font-[orbitron]">Nivel: {nivel}</div>
                <img
                    src={heroi.imagem ? `/avatar/${heroi.img}` : defaultImage}
                    alt={imageNotFound}
                />
                <p className={`${corNomePersonagem()} font-3xl font-[bangers]`}>{heroi.name}</p>


                <button className={`m-2.5 ${corBotao()}  text-white py-2 px-4 rounded`} onClick={mensagem}>Recrutar!</button>

                <div className="w-full h-2.5 rounded bg-gray-400">
                    <div
                        className={`h-2.5 rounded ${corBarra()} transition-all duration-300`}
                        style={{ width: `${xp}%` }} >
                    </div>
                </div>

                <button
                    className={`m-2.5 ${corBotao()} text-white py-2 px-4 rounded`}
                    onClick={() => { setXp(xp + 10) }}

                >+10 XP
                </button>

                <div className="text-white font-[orbitron]">XP: {xp}/100</div>
                <button className={`m-2.5 ${corBotao()}  text-white py-2 px-4 rounded`} onClick={excluir}>Excluir</button>
            </div>
        </div>

    );

}

export default Card;