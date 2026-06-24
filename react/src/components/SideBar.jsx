function SideBar({ setFirstComponent }) {
    return (
        <aside className="fixed top-0 right-0 z-40 w-72 h-screen grid grid-rows-[auto_1fr_auto] p-6 backdrop-blur-md backdrop-blur-md shadow-2xl border-l border-white/10">
            
 
            <div className="pt-16 pb-6 border-b border-white/10">
                <h2 className="text-white text-2xl font-bold font-[cinzel] tracking-widest uppercase">
                    Configurações
                </h2>
            </div>

           
            <ul className="flex flex-col justify-center gap-6 py-8">
                <li
                    onClick={() => setFirstComponent("guilda")}
                    className="flex items-center gap-3 text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer font-[cinzel] text-xl border-b border-white/10 pb-4"
                >
                    Guilda
                </li>
                <li
                    onClick={() => setFirstComponent("missoes")}
                    className="flex items-center gap-3 text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer font-[cinzel] text-xl border-b border-white/10 pb-4"
                >
                     Missões
                </li>
                <li
                    onClick={() => setFirstComponent("profile")}
                    className="flex items-center gap-3 text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer font-[cinzel] text-xl border-b border-white/10 pb-4"
                >
                     Profile
                </li>
            </ul>

         
            <div className="pb-6">
                <button
                    className="w-full py-3 rounded-xl bg-red-700/80 hover:bg-red-600 text-white font-[cinzel] font-bold text-lg tracking-wide transition-all duration-200"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                >
                     Logout
                </button>
            </div>
        </aside>
    );
}

export default SideBar;