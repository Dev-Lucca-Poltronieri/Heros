import { useState } from "react";
import axios from "axios";

function FormGuilda({ setFiltro }) {
    const [nomeGuilda, setNomeGuilda] = useState("");
    const [descricaoGuilda, setDescricaoGuilda] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoGuilda, setTipoGuilda] = useState("Heroi");

    async function criarGuilda(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/createGuilda",
                { name: nomeGuilda, description: descricaoGuilda, tipo: tipoGuilda },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMensagem("Guilda registered ✅");
            setNomeGuilda("");
            setDescricaoGuilda("");
            setTimeout(() => {
                setFiltro("minha");
                setMensagem("");
            }, 1500);
        } catch (error) {
            setMensagem(error.response?.data?.error || "Erro ao criar guilda");
        }
    }

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
                    required
                />

                <label className="font-bold text-gray-700">Tipo</label>
                <select
                    className="border-2 border-gray-700 bg-white p-2 rounded h-10"
                    value={tipoGuilda}
                    onChange={(e) => setTipoGuilda(e.target.value)}
                    required>
                    <option value="Herói">Herói</option>
                    <option value="EVO">EVO</option>
                    <option value="Campeão">Campeão</option>
                </select>

                <label className="font-bold text-gray-700">Descrição</label>
                <textarea
                    value={descricaoGuilda}
                    onChange={(e) => setDescricaoGuilda(e.target.value)}
                    placeholder="Descrição da guilda"
                    className="border-2 border-gray-700 bg-white p-2 rounded h-24 resize-none"
                    required
                />

                {mensagem && (
                    <p className={`text-center font-bold ${mensagem.includes("✅") ? "text-green-500" : "text-red-600"}`}>
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

export default FormGuilda;