import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Funnel, X, MapPin } from "lucide-react"
import L from "leaflet"
import LocalPopUp from "../components/LocalPopUp"
import UserLocation from "../components/UserLocation"

import markerShadow from "leaflet/dist/images/marker-shadow.png"

const iconRoxo = new L.Icon({
    iconUrl: '/location-pin-roxo.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconAzul = new L.Icon({
    iconUrl: '/location-pin-azul.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconVerde = new L.Icon({
    iconUrl: '/location-pin-verde.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconRosa = new L.Icon({
    iconUrl: '/location-pin-rosa.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const iconLaranja = new L.Icon({
    iconUrl: '/location-pin-laranja.png',
    shadowUrl: markerShadow,
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const faixasEtaria = [
    "Mirim",
    "Sub-11",
    "Sub-13",
    "Sub-15",
    "Sub-17",
    "Sub-20",
    "Adulto"
]

const niveis = ["Iniciante", "Intermediário", "Avançado", "Profissional"]

const tiposInternos = [
    { id: "evento", label: "Evento", icon: iconRoxo },
    { id: "quadra", label: "Quadra", icon: iconAzul },
    { id: "escolinha", label: "Escolinha", icon: iconVerde },
    { id: "clube", label: "Clube", icon: iconRosa },
    { id: "academia", label: "Academia", icon: iconLaranja },
]

export default function Mapa() {
    const [locais, setLocais] = useState([])
    const [eventos, setEventos] = useState([])
    const [busca, setBusca] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [center, setCenter] = useState([-23.5505, -46.6333])
    const [tipo, setTipo] = useState("Todos")
    const [faixaEtaria, setFaixaEtaria] = useState("Todas")
    const [custo, setCusto] = useState("Todos")
    const [nivel, setNivel] = useState("Todos")
    const [showLegend, setShowLegend] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchLocais() {
            try {
                const res = await fetch(`${API_URL}/locais`)

                const data = await res.json()
                console.log(data)

                setLocais(data)
            } catch (err) {
                console.error("Erro ao buscar locais:", err)
            }
        }

        async function fetchEventos() {
            try {
                const res = await fetch(`${API_URL}/eventos`)
                const data = await res.json()
                setEventos(data)
            } catch (err) {
                console.error("Erro ao buscar eventos:", err)
            }
        }

        fetchLocais()
        fetchEventos()
    }, [])
    const locaisFiltrados = locais.concat(eventos).filter((l) => {
        const matchBusca = l.nome.toLowerCase().includes(busca.toLowerCase())
        const matchTipo = tipo === "Todos" || l.tipo?.toLowerCase() === tipo.toLowerCase()

        if (l.tipo === "evento") {
            if (faixaEtaria !== "Todas" || custo !== "Todos" || nivel !== "Todos") {
                return false
            }
            return matchBusca && matchTipo
        }
        const matchFaixa =
            faixaEtaria === "Todas" ||
            l.faixaEtaria?.some((f) => f.toLowerCase() === faixaEtaria.toLowerCase())

        const matchCusto =
            custo === "Todos" || l.custo?.toLowerCase() === custo.toLowerCase()

        const matchNivel =
            nivel === "Todos" || l.nivel?.toLowerCase() === nivel.toLowerCase()

        return matchBusca && matchTipo && matchFaixa && matchCusto && matchNivel
    })

    function limparFiltros() {
        setTipo("Todos")
        setFaixaEtaria("Todas")
        setCusto("Todos")
        setNivel("Todos")
        setBusca("")
    }

    return (
        <main className="relative w-full h-screen">
            <div className="absolute top-4 left-12 right-4 z-50 flex bg-white shadow-md rounded-lg overflow-hidden w-80">
                <input
                    type="text"
                    placeholder="Buscar por locais, eventos..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="flex-1 px-3 py-2 focus:outline-none text-sm"
                />
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-3 bg-lilas text-white hover:bg-roxo transition flex items-center"
                >
                    {showFilters ? <X className="w-5 h-5" /> : <Funnel className="w-5 h-5" />}
                </button>
            </div>
            <button
                onClick={() => setShowLegend(!showLegend)}
                className="absolute bottom-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg md:hidden"
            >
                <MapPin className="w-5 h-5 text-lilas" />
            </button>
            {showFilters && (
                <div className="absolute inset-0 z-50 bg-white p-4 sm:overflow-y-auto md:w-72 md:top-20 md:left-12 md:shadow-xl md:flex md:flex-col md:gap-4 md:transition-all md:duration-200 md:h-[410px] md:rounded-md">
                    <div className="flex items-center justify-between mb-4 md:border-b pb-2">
                        <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={limparFiltros}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Limpar
                            </button>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="text-lilas hover:text-roxo md:hidden"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">Tipo</label>
                            <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilas transition"
                            >
                                <option value="Todos">Todos</option>
                                {tiposInternos.map((t) => (
                                    <option key={t.id} value={t.id}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">Faixa Etária</label>
                            <select
                                value={faixaEtaria}
                                onChange={(e) => setFaixaEtaria(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilas transition"
                            >
                                <option value="Todas">Todas</option>
                                {faixasEtaria.map((f) => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">Custo</label>
                            <select
                                value={custo}
                                onChange={(e) => setCusto(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilas transition"
                            >
                                <option>Todos</option>
                                <option>Gratuito</option>
                                <option>Pago</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium text-gray-700">Nível</label>
                            <select
                                value={nivel}
                                onChange={(e) => setNivel(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lilas transition"
                            >
                                <option value="Todos">Todos</option>
                                {niveis.map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowFilters(false)}
                        className="w-full bg-lilas text-white py-3 rounded-lg mt-6 hover:bg-roxo transition md:hidden"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            )}
            <MapContainer
                center={center}
                zoom={14}
                className="h-full w-full z-0"
                scrollWheelZoom={false}
                dragging={true}
                touchZoom={true}
            >
                <UserLocation />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
                    subdomains={["a", "b", "c", "d"]}
                />
                {locaisFiltrados.map((local) => (
                    <Marker
                        key={local.id}
                        position={local.local.pos}
                        icon={tiposInternos.find(t => t.id === local.tipo).icon}
                    >
                        <LocalPopUp local={local} />
                    </Marker>
                ))}
            </MapContainer>
            <div className="absolute bottom-20 right-10 bg-white p-5 rounded-lg shadow-md z-50 hidden md:block">
                <h3 className="font-bold mb-2">Legenda</h3>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-[#A263E6] rounded-full"></div>
                    <span>Evento</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-[#639AE6] rounded-full"></div>
                    <span>Quadra</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#63E6BE] rounded-full"></div>
                    <span>Escolinha</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#EF8962] rounded-full"></div>
                    <span>Clube</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#EF62C7] rounded-full"></div>
                    <span>Academia</span>
                </div>
            </div>
            {showLegend && (
                <div className="absolute bottom-16 right-4 z-50 bg-white p-4 rounded-lg shadow-md md:hidden">
                    <h3 className="font-bold mb-2 text-sm">Legenda</h3>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 bg-[#A263E6] rounded-full"></div>
                            <span className="text-xs">Evento</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#639AE6] rounded-full"></div>
                            <span className="text-xs">Quadra</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#63E6BE] rounded-full"></div>
                            <span className="text-xs">Escolinha</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#EF8962] rounded-full"></div>
                            <span className="text-xs">Clube</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#EF62C7] rounded-full"></div>
                            <span className="text-xs">Academia</span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
