import { useEffect, useState } from "react";
import axios from "axios";

function HeroSelector({ guilda, onFechar }) {
    const [herois, setHerois] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        buscarMeusHerois();
    }, []);

    async function buscarMeusHerois() {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/myHeroes", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("heróis retornados:", data);
            setHerois(data || []);
        } catch (error) {
            console.error(error);
            setHerois([]);
        } finally {
            setLoading(false);
        }
    }

    async function inserirHerois() {
        if (selecionados.length === 0) return;
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/insertIntoGuilda",
                { guildaId: guilda.id, heroIds: selecionados },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMensagem("Heroes registered ✅");
            setSelecionados([]);
            setTimeout(() => {
                setMensagem("");
                onFechar();
            }, 1500);
        } catch (error) {
               console.log("erro completo:", error.response);
            //setMensagem(error.response?.data?.error || "Error on Insert Hero");
        }
    }

    function toggleSelecionado(heroId) {
        setSelecionados((prev) =>
            prev.includes(heroId) ? prev.filter((id) => id !== heroId) : [...prev, heroId]
        );
    }

    function heroiCompativel(heroi) {
        return heroi.class === guilda.tipo;
    }

    
   function corGuilda(){
        if(guilda.tipo == 'Herói'){
            return 'text-amber-500'
        }
        if(guilda.tipo == 'EVO'){
            return 'text-purple-600'
        }
        if(guilda.tipo == 'Campeão'){
            return 'text-green-700'
        }
            
   }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-60"
            onClick={onFechar}
        >
            <div
                className="bg-gray-700 rounded-xl shadow-2xl p-6 w-[60%] h-[50%] flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="font-bold text-gray-100 text-center">
                    Adicionar Heróis —{" "}
                    <span className={corGuilda()}>{guilda.tipo}</span>
                </p>

                {loading ? (
                    <p className="text-center text-gray-300 text-sm py-4">Carregando heróis...</p>
                ) : herois.length === 0 ? (
                    <p className="text-center text-gray-300 text-sm py-4">Nenhum herói encontrado.</p>
                ) : (
                    <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto pr-1">
                        {herois.map((heroi) => {
                            const compativel = heroiCompativel(heroi);
                            const selecionado = selecionados.includes(heroi.id);

                            return (
                                <div
                                    key={heroi.id}
                                    className={`
                                            flex flex-col items-center justify-between
                                            rounded-lg px-3 w-25 h-30 py-2 gap-2 bg-gray-600 transition-all duration-150
                                            ${compativel
                                            ? selecionado
                                                ? ""
                                                : ""
                                            : "bg-gray-800/50 border-gray-600 opacity-40"
                                        }
`}
                                >
                                    <p className={`text-sm font-bold text-center leading-tight ${compativel ? "text-gray-100" : "text-gray-500"}`}>
                                        {heroi.name}
                                    </p>

                                    {compativel ? (
                                        <button
                                            onClick={() => toggleSelecionado(heroi.id)}
                                            className={`
                                                w-4 h-4 rounded-full border-2 border-gray-100 transition-all duration-150 cursor-pointer
                                                ${selecionado
                                                    ? "bg-gray-100"
                                                    : ""
                                                }
                                            `}
                                        />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full bg-gray-600 border-2 border-gray-500" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {mensagem && (
                    <p className={`text-center text-sm font-bold ${mensagem.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                        {mensagem}
                    </p>
                )}


                <div className="flex  gap-3  items-end mt-auto ">
                    <button
                        onClick={onFechar}
                        className="w-full cursor-pointer rounded-lg bg-gray-600 text-gray-200 h-9 text-sm font-bold hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={inserirHerois}
                        disabled={selecionados.length === 0}
                        className={`
                            w-full cursor-pointer rounded-lg h-9 text-sm font-bold transition-all
                            ${selecionados.length > 0
                                ? "bg-cyan-600 text-white hover:bg-cyan-500"
                                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }
                        `}
                    >
                        Confirmar {selecionados.length > 0 && `(${selecionados.length})`}
                    </button>
                </div>


            </div>
        </div>
    );
}

export default HeroSelector;