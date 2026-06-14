import { useState } from "react";
import axios from "axios";



function Cadastro({setFirstComponent}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});





    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(
                "http://localhost:5000/saveUser",
                {
                    name,
                    email,
                    password
                }
            );
            setErrors({})
            setMensagem(data.message);

        } catch (error) {
            if (error.response?.data?.error) {
                setErrors(error.response.data.error);
            }
        }
    }





    return (

        <div className="flex min-h-screen items-center justify-center">
            <div
                className=" w-full max-w-md p-8 space-y-6 backdrop-blur-md text-white border-2 rounded-lg shadow-md hover:border-blue-300  transition-all group">
                <h2 className="text-3xl font-bold text-center color-white group-hover:text-blue-300 transition-all">
                    Cadastro
                </h2>
                <h4 className=" text-center color-white">Junte-se a nós para começar</h4>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">


                    <div>
                        <label className="block text-sm text-white font-medium mb-1">
                            Nome
                        </label>

                        <input
                            name="nome"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className=" w-full text-black px-4 py-2 rounded-md border border-slate-300  bg-white focus:outline-none focus:border-gray-900 focus:border-2 transition-colors" />

                        {errors.name?._errors?.[0] && (
                            <p className="text-red-600  mt-1">
                                {errors.name._errors[0]}
                            </p>
                        )}
                    </div>


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

                        {errors.email?._errors?.[0] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email._errors[0]}
                            </p>
                        )}
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
                        
                        {errors.password?._errors?.[0] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password._errors[0]}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className=" w-full py-2.5 rounded-md bg-blue-100 text-gray-900 font-semibold hover:bg-blue-200 transition-colors" >
                        Cadastrar
                    </button>
                </form>

                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={() => setFirstComponent('login')}
                        className="color-white hover:-translate-y-1 font-medium hover:text-blue-100 transition-all">
                        Fazer Login
                    </button>
                </div>

             

                {mensagem && (
                    <p className={`text-center text-green-600`}>{mensagem}</p>
                )}
            </div>

        </div>

    )
};

export default Cadastro;