import fundoForm from '../assets/avatar/fundoForm.jpg';
import { useState } from 'react';
import { z } from 'zod';





const schema = z.object({
    nome: z.string(),
    classe: z.string().min(3, "The Class Request 3 caracters"),
    status: z.string()
})

function Formulario() {

    const [mensagem, setMensagem] = useState("");
    const [nome, setNome] = useState("");
    const [classe, setClasse] = useState("");
    const [status, setStatus] = useState("");
    // const [imagem, setImagem] = useState("");

    const [formData, setFormData] = useState({
        nome: '',
        classe: '',
        imagem: '',
        status: '',
    })

    const [erros, setErros] = useState({});



    const handlecadastro = async (e) => {
        e.preventDefault();

        const result = schema.safeParse(formData);
        if (!result.success) {
            return setErros(result.error.format());
        }


        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, classe, status }),
            });

            const data = await response.json();
            if (response.ok) {
                setMensagem("Usuario cadastrado com Sucesso!");
            } else {
                setMensagem("Erro: " + data.erro);
            }
        } catch (error) {
            error.setMensagem("Erro ao conectar com o servidor!");
        }
    };



    function handleChange(e) {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const result = schema.safeParse(formData);
        if (!result.success) {
            setErros(result.error.format());
        } else {
            setErros({})
            alert("Formulário enviado com sucesso!")
        }
    }


    const formStyle = {

        padding: "1.5rem",
        borderRadius: "0.25rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        width: "550px",
        height: "700px",

        backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.5)),
            url(${fundoForm})
        `,
        backgroundSize: "cover",        // faz a imagem preencher tudo
        backgroundPosition: "center",   // centraliza
        backgroundRepeat: "no-repeat"

    };

    return (
        <div className="flex items-center justify-center bg-white h-188 w-150 rounded-2xl">
            <form

                onSubmit={handlecadastro}
                style={formStyle}
                onChange={handleChange}
            >
                <h1 className=' font-bold flex w-full justify-center text-3xl py-5 text-red-900'>Novo Herói</h1>
                <label className='flex w-full justify-center text-2xl mt-5 text-red-900'>Nome</label>
                <input
                    type="text"
                    name='nome'
                    placeholder='Nome'
                    onChange={(e) => setNome(e.target.value)}
                    className='border-2 border-red-900 bg-white p-2 rounded w-full mb-2 h-12'
                />
                {erros.nome && (
                    <p className='text-red-500'>{erros.nome._errors}</p>
                )}

                <label className='flex w-full justify-center text-2xl mt-5 text-red-900'>Classe</label>
                <input
                    type="text"
                    name='classe'
                    placeholder='Classe: Ex - Heroi - EVO - Campeão'
                    onChange={(e) => setClasse(e.target.value)}
                    className=' border-2 border-red-900 bg-white p-2 rounded w-full mb-2 h-12'
                />
                {erros.classe && (
                    <p className='text-red-500'>{erros.classe._errors}</p>
                )}

                <label className='flex w-full justify-center text-2xl mt-5 text-red-900'>Status</label>
                <input
                    type="text"
                    name='status'
                    placeholder='Ex: online'
                    onChange={(e) => setStatus(e.target.value)}
                    className='border-2 border-red-900 bg-white p-2 rounded w-full mb-2 h-12'
                />
                {erros.status && (
                    <p className='text-red-500'>{erros.status._errors}</p>
                )}

                <label className='flex w-full justify-center text-2xl mt-5 text-red-900'>Imagem</label>
                <input
                    type="file"
                    name='img'
                    placeholder='Selecione sua Imagem'
                    // onChange={setImagem}
                    className=' border-2 p-2 rounded w-full mb-2 h-12 bg-white border-red-900'
                />
                {erros.img && (
                    <p className='text-red-500'>{erros.senha._errors}</p>
                )}

                <button className="bg-red-900 text-white w-full p-2 rounded mt-10 h-25 ">
                    Salvar
                </button>

            </form>

            {
                mensagem && (
                    <div
                        className={`p-3 rounded-md text-center text-sm font-medium 
                    ${mensagem.includes("Sucesso") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                        {mensagem}
                    </div>
                )
            }
        </div >

    )
}


export default Formulario;