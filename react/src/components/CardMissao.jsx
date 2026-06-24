import { useEffect, useState } from "react";
import axios from "axios";

function CardMissao({ filtro, setFiltro, refresh, setCoins }) {
    const [missoes, setMissoes] = useState([]);
    const [progressos, setProgressos] = useState([]);
    const [mensagem, setMensagem] = useState("");

    async function buscarMissoes() {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/getMissoes", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function buscarMissoesCompletas() {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/getMissoesCompletas", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function buscarProgressoRaw() {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/getProgresso", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function skipMissao(id) {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`http://localhost:5000/skipMissao/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMissoes(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error("Erro ao skipar missão", error);
        }
    }

    async function coletarRecompensa() {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.post("http://localhost:5000/verificarMissoes", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCoins(data.coins); // ✅ usa o valor que veio do backend
        setMensagem("Recompensa coletada ✅");
        setTimeout(async () => {
            setMensagem("");
            const atualizado = await buscarMissoes();
            const progressoAtualizado = await buscarProgressoRaw();
            setMissoes(atualizado || []);
            setProgressos(progressoAtualizado);
        }, 1500);
    } catch (error) {
        console.error("Erro ao coletar recompensa", error);
    }
}
    useEffect(() => {
        const fetchData = async () => {
            if (filtro === "missoes") {
                const data = await buscarMissoes();
                const progresso = await buscarProgressoRaw();
                setMissoes(data || []);
                setProgressos(progresso);
            } else if (filtro === "completas") {
                const data = await buscarMissoesCompletas();
                setMissoes(data || []);
                setProgressos([]);
            }
        };
        fetchData();
    }, [filtro, refresh]);

    return (
        <div className="h-full px-5 grid gap-5">

            {missoes.length === 0 && filtro === "missoes" && (
                <p className="text-center text-gray-300 text-xl pt-4">
                    Nenhuma missão disponível.
                </p>
            )}

            {missoes.length === 0 && filtro === "completas" && (
                <p className="text-center text-gray-300 text-xl pt-4">
                    Nenhuma missão completa.
                </p>
            )}

            {missoes.map((missao) => {
                const progresso = progressos.find(p => p.id === missao.id);
                const porcentagem = progresso ? progresso.porcentagem : 0;
                const total = progresso ? progresso.total : 0;
                const goal = progresso ? progresso.goal : missao.goal;
                const concluida = filtro === "completas" || porcentagem >= 100;

                return (
                    <div
                        key={missao.id}
                        className="w-[75%] flex flex-col rounded-xl bg-gray-400/60 shadow-2xl px-5 py-4 gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="grid">
                                <p className="font-bold text-xl">{missao.name}</p>
                                <p>{missao.description}</p>
                            </div>

                            {concluida ? (
                                filtro === "completas" ? (
                                    <button
                                        onClick={() => coletarRecompensa()}
                                        className="cursor-pointer rounded-xl bg-green-600 w-28 text-gray-100 px-2 h-10 font-bold hover:bg-green-500"
                                    >
                                        RESGATAR
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => coletarRecompensa()}
                                        className="cursor-pointer rounded-xl bg-green-600 w-28 text-gray-100 px-2 h-10 font-bold hover:bg-green-500"
                                    >
                                        Recompensa
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={() => skipMissao(missao.id)}
                                    className="cursor-pointer rounded-xl bg-red-700 w-20 text-gray-200 px-2 h-10 font-bold hover:bg-red-600"
                                >
                                    Skip
                                </button>
                            )}
                        </div>

                        {filtro === "missoes" && !concluida && (
                            <div className="w-full">
                                <div className="flex justify-between text-sm text-gray-200 mb-1">
                                    <span>Progresso</span>
                                    <span>{total} / {goal}</span>
                                </div>
                                <div className="w-full bg-gray-600 rounded-full h-3">
                                    <div
                                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${porcentagem}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            {mensagem && (
                <p className={`text-center font-bold ${mensagem.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                    {mensagem}
                </p>
            )}
        </div>
    );
}

export default CardMissao;