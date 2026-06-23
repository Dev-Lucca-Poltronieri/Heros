import { useEffect, useState } from "react";
import axios from "axios";


function CardGuilda({ filtro, setFiltro }) {
    const [guildas, setGuildas] = useState([]);
    const [expandedGuilda, setExpandedGuilda] = useState(null);

    // Form nova guilda
    const [nomeGuilda, setNomeGuilda] = useState("");
    const [descricaoGuilda, setDescricaoGuilda] = useState("");
    const [mensagem, setMensagem] = useState("");


    async function buscarGuildas() {
        try {
            const { data } = await axios.get("http://localhost:5000/getGuilda");
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function buscarMinhaGuilda() {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("http://localhost:5000/myGuilda", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function criarGuilda(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/createGuilda",
                { name: nomeGuilda, description: descricaoGuilda },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMensagem("Guilda criada com sucesso ✅");
            setNomeGuilda("");
            setDescricaoGuilda("");
            setTimeout(() => {
                setFiltro("minha"); // volta pra minha guilda após criar
                setMensagem("");
            }, 1500);
        } catch (error) {
            setMensagem(error.response?.data?.error || "Erro ao criar guilda");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (filtro === "todos") {
                const data = await buscarGuildas();
                setGuildas(data || []); // ← estava faltando
            } else if (filtro === "minha") {
                const data = await buscarMinhaGuilda();
                setGuildas(data || []); // ← array direto, não [data]
            }
        };
        fetchData();
    }, [filtro]);

    // Tela de criar nova guilda
    if (filtro === "nova") {
        return (
            <div className="flex justify-center px-5 pt-10">
                <div className="bg-gray-400/60 rounded-xl shadow-2xl px-10 py-8 w-[500px] flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-center text-gray-700">Nova Guilda</h2>

                    <label className="font-bold text-gray-700">Nome</label>
                    <input
                        type="text"
                        value={nomeGuilda}
                        onChange={(e) => setNomeGuilda(e.target.value)}
                        placeholder="Nome da guilda"
                        className="border-2 border-gray-700 bg-white p-2 rounded h-10"
                    />

                    <label className="font-bold text-gray-700">Descrição</label>
                    <textarea
                        value={descricaoGuilda}
                        onChange={(e) => setDescricaoGuilda(e.target.value)}
                        placeholder="Descrição da guilda"
                        className="border-2 border-gray-700 bg-white p-2 rounded h-24 resize-none"
                    />

                    {mensagem && (
                        <p className={`text-center font-bold ${mensagem.includes("✅") ? "text-green-700" : "text-red-700"}`}>
                            {mensagem}
                        </p>
                    )}

                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={() => setFiltro("minha")}
                            className="w-full cursor-pointer rounded-xl bg-red-800 text-white h-10 font-bold hover:bg-red-700"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={criarGuilda}
                            className="w-full cursor-pointer rounded-xl bg-amber-600 text-white h-10 font-bold hover:bg-amber-500"
                        >
                            Criar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

   
    function corTipo(tipo) {
        if (tipo === 'Heroi') return 'text-yellow-500 font-bold';
        if (tipo === 'EVO') return 'text-purple-700 font-bold';
        if (tipo === 'Campeao') return 'text-green-800 font-bold';
        return 'text-gray-700';
    }

    return (
        <>
            <div className="h-full px-5 grid gap-5">
                {guildas.length === 0 && (
                    <p className="text-center text-gray-300 text-xl pt-10">
                        {filtro === "minha" ? "Você ainda não tem uma guilda." : "Nenhuma guilda encontrada."}
                    </p>
                )}

                {guildas.map((guilda) => (
                    <div
                        key={guilda.id}
                        className="w-[75%] flex items-center justify-end h-35 rounded-xl bg-gray-400/60 shadow-2xl px-5 py-4"
                    >
                        <div className="grid w-full">
                            <div className="flex w-full align-center items-center gap-1 ">
                                <p className="font-bold text-xl">{guilda.name} </p>
                                -
                                <p className={`font-bold text-xl ${corTipo(guilda.tipo)}`}>{guilda.tipo}</p>
                            </div>


                            <p>{guilda.description}</p>
                        </div>
                        <div className="flex items-center justify-center h-full">
                            <button
                                onClick={() => setExpandedGuilda(guilda)}
                                className="cursor-pointer rounded-xl bg-gray-700 text-gray-200 px-2 h-10 font-bold hover:bg-gray-600"
                            >
                                Detalhes
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {expandedGuilda && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setExpandedGuilda(null)}
                >
                    <div
                        className="bg-gray-400/90 rounded-xl shadow-2xl px-10 py-8 w-1/2 flex flex-col items-center gap-4 h-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="font-bold text-2xl text-center">{expandedGuilda.name}</p>
                        <p className={`font-bold text-2xl text-center ${corTipo(expandedGuilda.tipo)}`}>{expandedGuilda.tipo}</p>
                        <div className="h-[80%] w-full">
                            <p className="text-center">{expandedGuilda.description}</p>
                        </div>
                        <div className="flex gap-50 mt-4 w-full">
                            <div className="flex w-full justify-center items-center">
                                <button
                                    onClick={() => setExpandedGuilda(null)}
                                    className="cursor-pointer rounded-xl bg-red-700 text-gray-200 px-4 h-10 font-bold"
                                >
                                    Fechar
                                </button>
                            </div>
                            <div className="flex w-full justify-center items-center">
                                <button className="cursor-pointer rounded-xl bg-cyan-600 text-white px-4 h-10 font-bold">
                                    Adicionar Heróis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardGuilda;