import { FolderHeart, Globe, Handshake } from "lucide-react"
import futebol from "../assets/futebol.jpg"
import mapa from "../assets/mapa.png"
import { useNavigate } from "react-router-dom"
import { getLoggedUser } from "../services/Auth"
import { Navigate } from "react-router-dom"

const events = [
    { title: 'Campeonato Feminino SP', date: '10/10/2025', location: 'São Paulo' },
    { title: 'Treino Aberto RJ', date: '15/10/2025', location: 'Rio de Janeiro' },
]

const testimonials = [
    { name: 'Maria', text: 'Consegui encontrar treinos perto de casa!' },
    { name: 'Ana', text: 'Agora organizar meus campeonatos ficou muito mais fácil.' },
]

export default function Home() {

    const navigate = useNavigate()

    const usuario = getLoggedUser()

    if (!usuario || usuario.role == "user") {
        return (
            <main className="w-full h-full text-gray-900 font-body">
                <section className="bg-lilas md:pl-8 text-white flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 p-4 md:m-8 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-title">
                            Conectando meninas e mulheres ao futebol em todo o Brasil
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Descubra treinos, campeonatos e oportunidades perto de você.
                        </p>
                        <button
                            onClick={() => navigate("/mapa")}
                            className="bg-verdeLimao hover:bg-[#e8fc4e] text-verdeCinza cursor-pointer font-bold py-3 px-6 rounded-lg transition">
                            Explorar o mapa
                        </button>
                    </div>
                    <div className="md:w-1/2 h-full">
                        <img
                            src={futebol}
                            alt="Mulheres jogando futebol"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </section>
                <section className="py-20 px-6 bg-gray-50">
                    <h2 className="text-3xl font-bold text-center font-title mb-12">Diferenciais da Plataforma</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-azul text-white">
                                <FolderHeart className="w-8 h-8" />
                            </div>
                            <p className="font-semibold text-verdeCinza">Centralização de informações</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-verde text-white">
                                <Globe className="w-8 h-8" />
                            </div>
                            <p className="font-semibold text-verdeCinza">Democratização e transparência</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-lilas">
                                <img
                                    src="soccer-ball.png"
                                    alt="Bola de futebol"
                                    className="w-8 h-8"
                                />
                            </div>
                            <p className="font-semibold text-verdeCinza">Gestão de encontros PassaBola</p>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-laranja text-white">
                                <Handshake className="w-8 h-8" />
                            </div>
                            <p className="font-semibold text-verdeCinza">Inclusão e diversidade</p>
                        </div>

                    </div>
                </section>
                <section className="py-20 px-6 bg-azul text-verdeCinza">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-title mb-4">Mapa de Oportunidades</h2>
                        <p className="mb-6">Encontre treinos, eventos e clubes perto de você em poucos cliques.</p>
                        <img
                            src={mapa}
                            alt="Mapa de oportunidades"
                            className="w-full rounded-lg shadow-lg mb-6"
                        />
                        <button
                            onClick={() => navigate("/mapa")}
                            className="bg-lilas hover:bg-roxo text-white cursor-pointer font-bold py-3 px-6 rounded-lg transition">
                            Ver mapa completo
                        </button>
                    </div>
                </section>
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold font-title text-center mb-12">Encontros PassaBola</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {events.map((event, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className="font-bold font-title text-xl mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-1">Data: {event.date}</p>
                                    <p className="text-gray-600">Local: {event.location}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20 px-6 bg-verdeLimao text-verdeCinza">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-title font-bold mb-8">Impacto Social</h2>
                        <div className="flex flex-col md:flex-row justify-around mb-12">
                            <div className="mb-4 md:mb-0">
                                <p className="text-4xl font-bold">+200</p>
                                <p>Oportunidades cadastradas</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">+500</p>
                                <p>Meninas conectadas ao futebol</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                                    <p className="mb-2">"{t.text}"</p>
                                    <p className="font-bold">- {t.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20 px-6 bg-lilas text-white text-center">
                    <h2 className="text-3xl font-title md:text-4xl font-bold mb-6">
                        Participe dessa rede e ajude a transformar o futebol feminino no Brasil
                    </h2>
                    <button
                        onClick={() => navigate("/cadastro")}
                        className="bg-verdeLimao hover:bg-[#e8fc4e] cursor-pointer text-verdeCinza font-bold py-3 px-6 rounded-lg transition">
                        Cadastrar-se grátis
                    </button>
                </section>
            </main>
        )
    }

    if (usuario.role == "admin") {
        return <Navigate to="/admin" replace />
    }
}