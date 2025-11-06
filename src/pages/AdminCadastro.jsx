import { useState } from "react"
import { handleCep } from "../utils/Cep"
import { MapPinHouse } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer} from "react-leaflet"
import L from 'leaflet'
import PointLocation from "../components/PointLocation"


const DefaultIcon = L.icon({
    iconUrl: './marker-icon.png',
    shadowUrl: './marker-shadow.png',
    iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

export default function AdminCadastro() {
    const navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [data, setData] = useState("")
    const [nomeLocal, setNomeLocal] = useState("")
    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [vagas, setVagas] = useState("")
    const [descricao, setDescricao] = useState("")

    const [mensagemErro, setMensagemErro] = useState("")
    const [cepErro, setCepErro] = useState("")

    const [center, setCenter] = useState([-23.5505, -46.6333])
    const [coordenadas, setCoordenadas] = useState(null)

    const [buscarNoMapa, setBuscarNoMapa] = useState(false)

    const handleBuscar = (e) => {
        e.preventDefault()
        setBuscarNoMapa(prev => !prev)
        console.log(buscarNoMapa);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !nome ||
            !data ||
            !nomeLocal ||
            !vagas ||
            !cep ||
            !logradouro ||
            !bairro ||
            !cidade ||
            !estado
        ) {
            setMensagemErro("Por favor, preencha todos os campos obrigatórios")
            return
        }
        setMensagemErro("")

        const evento = {
            nome: nome,
            data: data,
            local: {
                nomeLocal: nomeLocal,
                cep: cep,
                logradouro: logradouro,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                pos: coordenadas ? [coordenadas[0], coordenadas[1]] : null
            },
            tipo: "eventoPlataforma",
            vagas: vagas,
            ocupadas: 0,
            descricao: descricao,
            inscritosHistorico: [],
            inscritos: []

        }
        console.log("Cadastro:", evento)

        try {
            const response = await fetch("http://localhost:3000/eventos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento),
            });

            if (!response.ok) throw new Error("Erro ao cadastrar evento")

            const data = await response.json()
            console.log("Evento cadastrado com sucesso:", data)

            alert("Evento realizado com sucesso!")
            navigate("/admin")

        } catch (err) {
            console.error(err);
            setMensagemErro("Erro ao cadastrar evento.")
        }
    }

    const buscarEndereco = async (cep) => {
        if (cep.length < 8) {
            setCepErro("CEP inválido")
            return
        }
        const resultado = await handleCep(cep)
        if (resultado.erro) {
            setCepErro("CEP inválido")
            return
        }
        setCepErro("")
        setLogradouro(resultado.rua)
        setBairro(resultado.bairro)
        setCidade(resultado.cidade)
        setEstado(resultado.estado)
    }

    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 p-10 min-h-screen">
            <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="lg:w-1/2 p-8 flex flex-col gap-6">
                    <h1 className="text-2xl font-bold mb-4">Cadastrar Evento</h1>
                    {mensagemErro && (
                        <p className="text-red-500 text-sm text-center">{mensagemErro}</p>
                    )}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block font-semibold mb-1">Nome do Evento</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Data do Evento</label>
                            <input
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde"
                            />
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col gap-3">
                            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                <MapPinHouse className="w-5 h-5 text-gray-400" />
                                Local
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="col-span-1 lg:col-span-12">
                                    <input
                                        type="text"
                                        placeholder="Nome do local"
                                        value={nomeLocal}
                                        onChange={(e) => setNomeLocal(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde"
                                    />
                                </div>
                                <div className="col-span-1 lg:col-span-12">
                                    <input
                                        type="text"
                                        placeholder="CEP"
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)}
                                        onBlur={async () => {
                                            if (cep.trim() !== "") {
                                                await buscarEndereco(cep)
                                            }
                                        }}
                                        maxLength={8}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde"
                                    />
                                </div>
                                {cepErro && (
                                    <p className="text-red-500 text-sm mt-1">{cepErro}</p>
                                )}
                                <div className="col-span-1 lg:col-span-8">
                                    <input type="text"
                                        placeholder="Rua"
                                        value={logradouro}
                                        onChange={(e) => setLogradouro(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde" />
                                </div>
                                <div className="col-span-1 lg:col-span-4">
                                    <input
                                        type="text"
                                        placeholder="Número"
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde" />
                                </div>

                                <div className="col-span-1 lg:col-span-5">
                                    <input
                                        type="text" placeholder="Complemento"
                                        value={complemento}

                                        onChange={(e) => setComplemento(e.target.value)}

                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde" />
                                </div>
                                <div className="col-span-1 lg:col-span-7">
                                    <input
                                        type="text"
                                        placeholder="Bairro"
                                        value={bairro}
                                        onChange={(e) => setBairro(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde" />
                                </div>
                                <div className="col-span-1 lg:col-span-7">
                                    <input
                                        type="text"
                                        placeholder="Cidade"
                                        value={cidade}
                                        onChange={(e) => setCidade(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde" />
                                </div>
                                <div className="col-span-1 lg:col-span-5">
                                    <input
                                        type="text"
                                        placeholder="Estado"
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde" />
                                </div>
                                <div className="flex col-span-1 lg:col-span-5">
                                    <button
                                        type="button"
                                        onClick={handleBuscar}
                                        className="w-full sm:w-auto px-6 py-3 bg-lilas hover:bg-roxo text-white rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105 text-center"
                                    >
                                        Buscar no Mapa
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Número de vagas</label>
                            <input
                                type="number"
                                value={vagas}
                                onChange={(e) => setVagas(e.target.value)}
                                min="1"
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Descrição</label>
                            <textarea
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
                            <button
                                type="submit"
                                className="flex-1 sm:flex-none px-6 py-3 bg-lilas hover:bg-roxo text-white rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105 text-center"
                            >
                                Cadastrar Evento
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                className="flex-1 sm:flex-none px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105 text-center"
                            >
                                Voltar
                            </button>
                        </div>
                    </form>
                </div>
                <div className="lg:w-1/2 w-full flex items-center justify-center bg-verde/20">
                    <div className="w-full h-[500px] sm:h-[400px] lg:h-[100%] overflow-hidden shadow-md">
                        <MapContainer
                            center={center}
                            zoom={14}
                            className="w-full h-full z-0"
                            scrollWheelZoom={false}
                            dragging={true}
                            touchZoom={true}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://www.carto.com/">CARTO</a>'
                                subdomains={["a", "b", "c", "d"]}
                            />

                            <PointLocation
                                nomeLocal={nomeLocal}
                                logradouro={logradouro}
                                numero={numero}
                                cidade={cidade}
                                estado={estado}
                                buscarNoMapa={buscarNoMapa}
                                onCoordenadasChange={(coords) => setCoordenadas(coords)}
                            />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </main>
    )
}
