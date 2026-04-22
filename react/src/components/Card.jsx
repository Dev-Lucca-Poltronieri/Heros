import { useState } from "react";
import StatusBadge from "./StatusBadge";



function Card({ heroi, excluirHeroi }) {

    const [isSelected, setIsSelected] = useState(false);

    const mensagem = () => {
        alert(`${heroi.nome} selecionado com sucesso`)
    }

    const excluir = () => {
        excluirHeroi(heroi.id)
    }

    const [xp, setXp] = useState(0);
    const [nivel, setNivel] = useState(0);


    /* const cardStyle = {
         border: '1px solid #ddd',
         borderRadius: '12px',
         padding: '16px',
         margin: '10px',
         boxShadow: '0 4px 8px rgba(0, 0, 0.1)',
         textAlign: 'center',
         width: '200px',
         display: 'grid'
     };*/

    /*function destacar() {
        return {
            border: '2px solid blue',
            borderRadius: '12px',
            padding: '16px',
            margin: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0.1)',
            textAlign: 'center',
            width: '200px',
            display: 'grid'
        }
    }*/


    // let cor = "border-green-300";

    if (xp === 110) {
        setXp(0);
        setNivel(nivel + 1);

    }

    if (xp === 100) {
        // cor = "border-amber-300";
    }





    function corBorda() {
        if (isSelected == true && heroi.classe == 'EVO') {
            return 'border-2 border-purple-600 drop-shadow-[0_0_15px_#9333ea] transition-all duration-300'
        } else if (isSelected == true && heroi.classe == 'Heroi') {
            return 'border-2 border-amber-400 drop-shadow-[0_0_15px_#f59e0b] transition-all duration-300'
        } else if (isSelected == true && heroi.classe == 'Campeão') {
            return 'border-2 border-green-500  drop-shadow-[0_0_15px_#22c55e] transition-all duration-300'
        } else {
            return 'border-2 border-gray-200 shadow-sm transition-all duration-300'
        }
    }




    function corClasse() {
        if (heroi.classe == 'EVO') {
            return "text-purple-400 drop-shadow-[0_0_15px_#9333ea]"
        } else if (heroi.classe == 'Heroi') {
            return "text-amber-500 drop-shadow-[0_0_15px_#f59e0b]"
        } else if (heroi.classe == 'Campeão') {
            return "text-green-500  drop-shadow-[0_0_15px_#22c55e]"
        } else {
            return "";
        }
    }

    function corBarra() {
        if (heroi.classe == 'EVO') {
            return " bg-purple-600 drop-shadow-[0_0_5px_#9333ea]"
        } else if (heroi.classe == 'Heroi') {
            return "bg-amber-400  drop-shadow-[0_0_5px_#f59e0b]"
        } else if (heroi.classe == 'Campeão') {
            return "bg-green-500  drop-shadow-[0_0_5px_#22c55e]"
        } else {
            return "";
        }
    }

    function corBotao() {
        if (heroi.classe == 'EVO') {
            return " bg-purple-600"
        } else if (heroi.classe == 'Heroi') {
            return "bg-amber-400"
        } else if (heroi.classe == 'Campeão') {
            return "bg-green-500"
        } else {
            return "";
        }
    }

    function corFundoCard() {
        if (heroi.classe == 'EVO') {
            return " bg-blue-900"
        } else if (heroi.classe == 'Heroi') {
            return "bg-amber-900"
        } else if (heroi.classe == 'Campeão') {
            return "bg-green-900"
        } else {
            return "";
        }
    }

    function corNomePersonagem() {
        if (heroi.classe == 'EVO') {
            return " text-purple-200 text-xl"
        } else if (heroi.classe == 'Heroi') {
            return "text-amber-300 text-xl"
        } else if (heroi.classe == 'Campeão') {
            return "text-green-300 text-xl"
        } else {
            return "";
        }
    }

    const not_found = 'Imagem não Encontrada'






    return (
        <div className="">

            <div
                onClick={() => setIsSelected(!isSelected)}
                className={` ${corFundoCard()} border-4  rounded-xl p-4 m-2.5 shadow-md text-center w-70 h-165 ${corBorda()}`}>

                <h2 className={` font-[cinzel] text-2xl  font-semibold ${corClasse()}`}>{heroi.classe}</h2>
                <StatusBadge tipo={heroi.status} />

                <div className="text-white font-[orbitron]">Nivel: {nivel}</div>
                <img src={heroi.imagem} alt={not_found} style={{ width: '100%', borderRadius: '8px' }} />
                <p className={`${corNomePersonagem()} font-3xl font-[bangers]`}>{heroi.nome}</p>


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