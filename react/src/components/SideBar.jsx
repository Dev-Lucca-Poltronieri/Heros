function SideBar() {
    return (
      <aside className="backdrop-blur-md rounded-lg shadow-md w-full h-screen grid grid-rows-[auto_1fr_auto] p-4">

            <div>
                <h2 className="text-gray-300 h-20 text-xl font-bold drop-shadow-[0_0_8px_#D1D5DB] font-[cinzel]">
                    Configurações
                </h2>
            </div>

            <ul className="text-xl text-center space-y-7 font-[cinzel] ">
                <p className="hover:text-gray-300 hover:drop-shadow-[0_0_8px_#D1D5DB] hover:cursor-pointer">Guilda</p>
                <p className="hover:text-gray-300 hover:drop-shadow-[0_0_8px_#D1D5DB] hover:cursor-pointer">Missões</p>
                <p className="hover:text-gray-300 hover:drop-shadow-[0_0_8px_#D1D5DB] hover:cursor-pointer">Profile</p>
            </ul>






            <div>
                {/* Rodapé da sidebar */}
            </div>
        </aside>
    );
}


export default SideBar;

