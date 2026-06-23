import { useEffect, useState } from "react";
import axios from "axios";

function CardGuilda() {
    const [guildas, setGuildas] = useState([]);

    async function buscarGuildas() {
        try {
            const { data } = await axios.get("http://localhost:5000/getGuilda");
            console.log("data", data)
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const guildas = await buscarGuildas();
            setGuildas(guildas || []);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="h-full px-5">
                {guildas.map((guilda) => (
                    <div key={guilda.id} className="w-[75%] flex align-center justify-end h-35 border-2 border-gray-500 rounded-xl backdrop-blur-md shadow-2xl px-5 py-4">
                        <div className="grid  w-full">
                            <p className="font-bold text-xl">
                                {guilda.name}
                            </p>        {/* ✅ nome da guilda */}
                            <p>{guilda.description}</p>   {/* ✅ descrição da guilda */}
                        </div>
                        <div className="flex items-center justify-center h-full"> 

                            <button className="bg-blue-300 rounded-xl px-2 h-10 font-bold">
                                Detalhes
                            </button>

                        </div>
                       
                    </div>
                ))}
            </div>
        </>
    );
}

export default CardGuilda;