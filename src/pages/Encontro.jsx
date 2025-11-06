import { useState, useEffect } from "react"
import ilustracao from "../assets/ilustracao2.png"
import { getLoggedUser } from "../services/Auth"
import { formatDate } from "../utils/DataFormato"
import { MapPin, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Encontro() {

    const [encontros, setEncontros] = useState([])
    const [selectedEncontro, setSelectedEncontro] = useState(null)
    const [mensagem, setMensagem] = useState("")

    const usuario = getLoggedUser()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchEncontros() {
            try {
                const response = await fetch(`http://localhost:3000/eventos`)
                const data = await response.json()
                setEncontros(data)
            } catch (err) {
                console.error("Erro ao buscar encontros:", err)
            }
        }

        fetchEncontros()
    }, [])

    const handleInscricao = async () => {
        if (!selectedEncontro) {
            setMensagem("Selecione um encontro para se inscrever.")
            return
        }
        try {
            const inscricao = usuario.inscricoes.find(
                (i) => i.eventoId === selectedEncontro.id
            )
            const jaInscrito = inscricao ? true : false
            if (jaInscrito) {
                setMensagem("Você já está inscrita nesse encontro.")
                return
            }

            const statusInscricao = selectedEncontro.vagas > 0 ? "Confirmada" : "Lista de Espera"

            const eventoAtualizado = {
                ...selectedEncontro,
                inscritos: [
                    ...selectedEncontro.inscritos,
                    { usuarioId: usuario.id, status: statusInscricao }
                ],
                ocupadas: statusInscricao === "Confirmada" ? selectedEncontro.ocupadas + 1 : selectedEncontro.ocupadas,
                vagas: statusInscricao === "Confirmada" ? selectedEncontro.vagas - 1 : selectedEncontro.vagas,
                inscritosHistorico: [
                    ...selectedEncontro.inscritosHistorico, {
                        data: new Date().toISOString().split("T")[0],
                        total: selectedEncontro.inscritos.length + 1
                    }
                ]
            }

            const eventoResponse = await fetch(
                `http://localhost:3000/eventos/${selectedEncontro.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(eventoAtualizado),
                }
            )

            if (!eventoResponse.ok) {
                throw new Error("Erro ao atualizar o evento")
            }

            usuario.inscricoes.push({
                eventoId: selectedEncontro.id,
                nomeEvento: selectedEncontro.nome,
                dataEvento: selectedEncontro.data,
                local: selectedEncontro.local.nomeLocal,
                status: statusInscricao,
                dataInscricao: new Date().toISOString().split("T")[0]
            })

            const usuarioResponse = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario),
            })

            if (!usuarioResponse.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            alert(
                `Inscrição ${statusInscricao === "Confirmada"
                    ? "confirmada"
                    : "adicionada à lista de espera"
                } para: ${selectedEncontro.nome}`
            )

            navigate("/perfil")


        } catch (err) {
            console.error(err);
            setMensagem("Erro ao se inscrever. Tente novamente.")
        }
    }

    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 p-10">
            <div className="w-full mx-auto flex items-center justify-center">
                <div className="flex flex-col lg:flex-row w-full lg:min-h-[700px] max-w-screen-xl bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-12">
                        <h1 className="text-2xl font-bold mb-4">Inscrição no Encontro Passa Bola</h1>
                        <label className="block mb-2 font-medium">Escolha o encontro:</label>
                        <select
                            value={selectedEncontro?.id || ""}
                            onChange={(e) => {
                                const encontro = encontros.find((en) => en.id === e.target.value)
                                setSelectedEncontro(encontro)
                                setMensagem("")
                            }}
                            className="w-full border rounded p-2 mb-4"
                        >
                            <option value="">-- Selecione um encontro --</option>
                            {encontros.map((en) => (
                                <option key={en.id} value={en.id}>
                                    {en.nome} - {formatDate(en.data)} ({en.vagas} vagas)
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleInscricao}
                            className="w-full bg-lilas text-white py-2 rounded hover:bg-roxo transition"
                        >
                            Confirmar Inscrição
                        </button>

                        {mensagem && <p className="mt-4 text-gray-950 font-medium">{mensagem}</p>}

                        {selectedEncontro && (
                            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow border border-gray-200">
                                <h2 className="font-bold text-xl mb-2 text-gray-800">
                                    {selectedEncontro.nome}
                                </h2>
                                <p className="text-gray-700 text-sm mb-1">
                                    {selectedEncontro.descricao || "Sem descrição"}
                                </p>
                                <p className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(selectedEncontro.data)}
                                </p>
                                <p className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                                    <MapPin className="w-4 h-4" />
                                    {selectedEncontro.local.nomeLocal}
                                </p>
                                <p className="text-gray-700 text-sm">
                                    Vagas disponíveis: {selectedEncontro.vagas}
                                </p>
                            </div>
                        )}

                    </div>
                    <div className="lg:w-1/2 hidden lg:flex justify-center items-center bg-verde/20">
                        <img src={ilustracao} alt="Mulheres jogando futebol" className="w-full max-w-md" />
                    </div>
                </div>
            </div>
        </main>
    )
}