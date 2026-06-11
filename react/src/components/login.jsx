import { useState } from "react";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch("http://localhost:5000/saveUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            });
            const data = await response.json();

            if (response.ok) {
                setMensagem(`Bem vindo!`);
            } else {
                setMensagem(data.mensagem)
            }
        } catch (error) {
            console.error(error)
        }
    }





    return (

        <div className="flex min-h-screen items-center justify-center">
            <div
                className=" w-full max-w-md p-8 space-y-6 backdrop-blur-md text-white border-2 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center color-white">
                    Login
                </h2>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5">
                    <div>
                        <label className="block text-sm color-white font-medium  mb-1">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" w-full color-white px-4 py-2 rounded-md border border-slate-300  bg-white focus:outline-none focus:border-gray-900 focus:border-2 transition-colors" />

                    </div>

                    <div>
                        <label className="block color-white text-sm font-medium mb-1">
                            Senha
                        </label>

                        <input
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="color-white w-full px-4 py-2 rounded-md border border-slate-300 bg-white focus:outline-none focus:border-gray-900 focus:border-2 transition-colors" />
                    </div>

                    <button
                        type="submit"
                        className=" w-full py-2.5 rounded-md bg-blue-100 text-gray-900 font-semibold hover:bg-blue-200 transition-colors" >
                        Entrar
                    </button>
                </form>

                <div className="flex justify-center mt-4">
                    <a
                        href="Cadastro.jsx"
                        className="color-white hover:-translate-y-1 transition-all font-medium">
                        Não possui Cadastro? Fazer Cadastro
                    </a>
                </div>

                {mensagem && (
                    <p className={`text-center text-sm ${mensagem.includes("Bem vindo!") ? "text-green-600" : "text-red-600"}`}>{mensagem}</p>
                )}
            </div>
        </div>

    );
}

export default Login;