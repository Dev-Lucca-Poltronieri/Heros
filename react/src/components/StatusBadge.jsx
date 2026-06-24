



function StatusBadge({ tipo }) {



    const estilos = {
        Online: "bg-green-500 shadow-green-700",
        Offline: "bg-red-500 shadow-gray-200 ",
        Ausente: "bg-amber-400 shadow-amber-200",
    };


    function mudarCor() {

        if (tipo == "Online") {

            return "text-green-500";

        } else if (tipo == 'Ausente') {

            return "text-amber-500";

        } else if (tipo == 'Offline') {

            return "text-red-500";

        } else {
            return "";
        }
    }

    function mudarSombra() {

        if (tipo == "Online") {

            return "shadow-md shadow-green-500/50 bg-green-500 rounded-full w-3 h-3";

        } else if (tipo == 'Ausente') {

            return "shadow-md shadow-amber-500/50 bg-amber-500 rounded-full w-3 h-3";

        } else if (tipo == 'Offline') {

            return "shadow-md shadow-red-500/50 bg-red-500 rounded-full w-3 h-3";

        } else {
            return "";
        }
    }



    return (
        <div className="flex justify-center">
            <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg w-fit">
                <div className={`w-3 h-3 rounded-full ${mudarSombra()} ${estilos[tipo] || estilos.offline}`} />
                <span className={`text-xs- font-bold font-[orbitron] uppercase  ${mudarCor()}`} >
                    {tipo}
                </span>
            </div>
        </div>

    );
}

export default StatusBadge;
