import { useState } from "react";
import axios from "axios";


function Login({ setFirstComponent }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(
                "http://localhost:5000/validateUser",
                {

                    email,
                    password
                }
            );
            setErrors('')
            localStorage.setItem("userId", data.userId);
            setFirstComponent("home");



        } catch (error) {
            setErrors(
                error.response?.data?.mensagem || "Invalid Login"
            );
        }
    }





    return (

        <div className="flex min-h-screen items-center justify-center">
            <div
                className=" w-full max-w-md p-8 space-y-6 backdrop-blur-md text-white border-2 rounded-lg shadow-md hover:border-blue-300  transition-all group">
                <h2 className="text-3xl font-bold text-center color-white group-hover:text-blue-300 transition-all">
                    Login
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    <div>
                        <label className="block text-sm text-white font-medium mb-1">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" w-full text-black px-4 py-2 rounded-md border border-slate-300  bg-white focus:outline-none focus:border-gray-900 focus:border-2 transition-colors" />

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
                            className="text-black w-full px-4 py-2 rounded-md border border-slate-300 bg-white focus:outline-none focus:border-gray-900 focus:border-2 transition-colors" />
                    </div>

                    <button
                        type="submit"
                        //onClick={() => setFirstComponent('home')}
                        className=" w-full py-2.5 rounded-md bg-blue-100 text-gray-900 font-semibold hover:bg-blue-200 transition-colors" >
                        Entrar
                    </button>
                </form>

                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={() => setFirstComponent('cadastro')}
                        className="color-white hover:-translate-y-1 transition-all font-medium">
                        Não possui Cadastro? Fazer Cadastro
                    </button>
                </div>

                {error && (
                    <p className={`text-center text-red-600`}>{error}</p>
                )}
            </div>
        </div>

    );
}

export default Login;