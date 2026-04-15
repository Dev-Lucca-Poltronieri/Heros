import React, { useState } from "react";

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [classe, setClasse] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handlecadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, classe }),
            });

            const data = await response.json();
            if (response.ok) {
                setMensagem("Usuario cadastrado com sucesso!");
            } else {
                setMensagem("Erro: " + data.erro);
            }
        } catch (error) {
            error.setMensagem("Erro ao conectar com o servidor!");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="text-center">
                    <h2 className="text-3xl front-extrabold text-gray-900">
                        Criar Conta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Junte-se a nós para começar
                    </p>
                </div>

                <form className="space-y-4" onSubmit={{ handlecadastro }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Lucca Poltronieri"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            E-Mail
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="exemplo@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="**********"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 text-white bg-blue-600 rounded-md font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg"
                    >
                        Cadastrar
                    </button>
                </form>

                {mensagem && (
                    <div
                        className={`p-3 rounded-md text-center text-sm font-medium 
                ${mensagem.includes("Sucesso") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                        {mensagem}
                    </div>
                )}
                <div className="textx-center">
                    <p className="text-sm text-gray-500">
                        Já possui uma conta?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Faça agora o Login
                        </a>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
