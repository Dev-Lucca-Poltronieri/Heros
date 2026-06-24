import { useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

const profileSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 letras"),
    email: z.string().email("E-mail inválido"),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
}).refine((data) => {
    if (data.newPassword && !data.oldPassword) return false;
    return true;
}, { message: "Digite a senha antiga para definir uma nova", path: ["oldPassword"] })
.refine((data) => {
    if (data.newPassword && data.newPassword.length < 8) return false;
    return true;
}, { message: "Nova senha deve ter pelo menos 8 caracteres", path: ["newPassword"] })
.refine((data) => {
    if (data.newPassword && !/^(?=.*[A-Za-z])(?=.*\d).+$/.test(data.newPassword)) return false;
    return true;
}, { message: "Nova senha deve ter letras e números", path: ["newPassword"] });

function Profile({ setFirstComponent }) {
    const [form, setForm] = useState({ name: "", email: "", oldPassword: "", newPassword: "" });
    const [erros, setErros] = useState({});
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function buscarPerfil() {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/getProfile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setForm(prev => ({ ...prev, name: data.name, email: data.email }));
            } catch (error) {
                console.error(error);
            }
        }
        buscarPerfil();
    }, []);

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErros(prev => ({ ...prev, [e.target.name]: "" }));
    }

    async function handleSubmit() {
        const result = profileSchema.safeParse(form);
        if (!result.success) {
            const formatted = result.error.format();
            setErros({
                name: formatted.name?._errors[0],
                email: formatted.email?._errors[0],
                oldPassword: formatted.oldPassword?._errors[0],
                newPassword: formatted.newPassword?._errors[0],
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.patch("http://localhost:5000/updateProfile", form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMensagem("Perfil atualizado ✅");
            setForm(prev => ({ ...prev, oldPassword: "", newPassword: "" }));
            setTimeout(() => setMensagem(""), 2000);
        } catch (error) {
            setMensagem(error.response?.data?.error || "Erro ao atualizar perfil");
        }
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center px-6">
            <div className="w-full max-w-md bg-gray-400/60 rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-gray-100 text-center">Meu Perfil</h1>

                {/* Nome */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 font-bold">Nome</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="rounded-xl px-4 py-2 bg-gray-700/60 text-gray-100 outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    {erros.name && <p className="text-red-400 text-sm">{erros.name}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 font-bold">E-mail</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-xl px-4 py-2 bg-gray-700/60 text-gray-100 outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    {erros.email && <p className="text-red-400 text-sm">{erros.email}</p>}
                </div>

                <hr className="border-gray-500" />

                {/* Senha antiga */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 font-bold">Senha antiga</label>
                    <input
                        name="oldPassword"
                        type="password"
                        value={form.oldPassword}
                        onChange={handleChange}
                        placeholder="Digite para alterar a senha"
                        className="rounded-xl px-4 py-2 bg-gray-700/60 text-gray-100 outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                    />
                    {erros.oldPassword && <p className="text-red-400 text-sm">{erros.oldPassword}</p>}
                </div>

                {/* Nova senha */}
                <div className="flex flex-col gap-1">
                    <label className="text-gray-200 font-bold">Nova senha</label>
                    <input
                        name="newPassword"
                        type="password"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="Mínimo 8 caracteres com letras e números"
                        className="rounded-xl px-4 py-2 bg-gray-700/60 text-gray-100 outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
                    />
                    {erros.newPassword && <p className="text-red-400 text-sm">{erros.newPassword}</p>}
                </div>

                {mensagem && (
                    <p className={`text-center font-bold ${mensagem.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                        {mensagem}
                    </p>
                )}

                <div className="flex justify-between mt-2">
                    <button
                        onClick={() => setFirstComponent("home")}
                        className="cursor-pointer px-4 py-2 rounded-2xl text-xl font-bold text-gray-100 bg-gray-700 hover:bg-gray-600"
                    >
                        Voltar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="cursor-pointer px-6 py-2 rounded-2xl text-xl font-bold text-gray-100 bg-green-700 hover:bg-green-600"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;