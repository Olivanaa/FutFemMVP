import { logout, getLoggedUser } from "../services/Auth"

export default function AdminNavbar() {
    const usuario = getLoggedUser()

    return (
        <nav className="bg-lilas text-white p-4 flex justify-between items-center">
            <div className="font-bold text-lg">Painel Admin</div>
            <div className="flex items-center gap-4">
                <span>Olá, {usuario?.nome}</span>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                >
                    Sair
                </button>
            </div>
        </nav>
    )
}