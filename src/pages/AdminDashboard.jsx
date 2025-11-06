import { useState, useEffect } from "react"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { formatDate } from "../utils/DataFormato"
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
    const [eventos, setEventos] = useState([])
    const [selectedEvento, setSelectedEvento] = useState(null)

    useEffect(() => {
        async function fetchEventos() {
            const response = await fetch("http://localhost:3000/eventos")
            const data = await response.json()
            setEventos(data)
            console.log(data)

        }
        fetchEventos()
    }, [])

    const handleStatusChange = async (eventoId, usuarioId, novoStatus) => {
        const evento = eventos.find(e => e.id === eventoId);
        const inscritosAtualizados = evento.inscritos.map(i =>
            i.usuarioId === usuarioId ? { ...i, status: novoStatus } : i
        )

        const eventoAtualizado = { ...evento, inscritos: inscritosAtualizados };
        await fetch(`http://localhost:3000/eventos/${eventoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventoAtualizado),
        })

        setEventos(prev =>
            prev.map(e => (e.id === eventoId ? eventoAtualizado : e))
        )
    }

    const totalInscritos = eventos.reduce((acc, e) => acc + e.inscritos.length, 0)
    const totalVagas = eventos.reduce((acc, e) => acc + parseInt(e.vagas, 10), 0);

    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 p-10 min-h-screen">
            <div className="max-w-screen-xl mx-auto bg-white shadow-2xl rounded-lg p-6 flex flex-col gap-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-100 rounded-lg shadow text-center">
                        <h2 className="font-semibold">Total de Eventos</h2>
                        <p className="text-2xl font-bold">{eventos.length}</p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg shadow text-center">
                        <h2 className="font-semibold">Total de Participantes</h2>
                        <p className="text-2xl font-bold">{totalInscritos}</p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow text-center">
                        <h2 className="font-semibold">Vagas Disponíveis</h2>
                        <p className="text-2xl font-bold">{totalVagas}</p>
                    </div>
                </div>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full table-auto border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Evento</th>
                                <th className="px-4 py-2 text-center">Data</th>
                                <th className="px-4 py-2 text-center">Local</th>
                                <th className="px-4 py-2 text-center">Vagas</th>
                                <th className="px-4 py-2 text-center">Inscritos</th>
                                <th className="px-4 py-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.map(evento => (
                                <tr key={evento.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{evento.nome}</td>
                                    <td className="px-4 py-2 text-center">{formatDate(evento.data)}</td>
                                    <td className="px-4 py-2 text-center">{evento.local.nomeLocal}</td>
                                    <td className="px-4 py-2 text-center">{evento.vagas}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            onClick={() =>
                                                setSelectedEvento(selectedEvento?.id === evento.id ? null : evento)
                                            }
                                            className="text-purple-600 hover:underline"
                                        >
                                            {evento.inscritos.length} inscritos
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 text-center flex gap-2 justify-center">
                                        <button className="px-4 py-1 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition">
                                            Editar
                                        </button>
                                        <button className="px-4 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedEvento && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                        <h2 className="font-bold mb-2">Participantes - {selectedEvento.nome}</h2>
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-2 py-1 text-left">Usuário ID</th>
                                    <th className="px-2 py-1 text-left">Status</th>
                                    <th className="px-2 py-1 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedEvento.inscritos.map(inscrito => (
                                    <tr key={inscrito.usuarioId} className="hover:bg-gray-200">
                                        <td className="px-2 py-1">{inscrito.usuarioId}</td>
                                        <td className="px-2 py-1">{inscrito.status}</td>
                                        <td className="px-2 py-1 flex gap-2">
                                            <button
                                                onClick={() => handleStatusChange(selectedEvento.id, inscrito.usuarioId, "Confirmada")}
                                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Confirmar
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(selectedEvento.id, inscrito.usuarioId, "Cancelado")}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(selectedEvento.id, inscrito.usuarioId, "Lista de Espera")}
                                                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Lista de Espera
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-6 p-4 bg-white rounded-lg shadow">
                    <h2 className="font-bold mb-2">Estatísticas de Inscritos</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart>
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            {eventos.map((evento, index) => (
                                <Line
                                    key={evento.id}
                                    data={evento.inscritosHistorico}
                                    type="monotone"
                                    dataKey="total"
                                    name={evento.nome}
                                    stroke={["#6B46C1", "#48BB78", "#3182CE", "#E53E3E"][index % 4]}
                                    strokeWidth={2}
                                    dot
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-6 flex justify-end">
                    <Link to="evento">
                        <button className="px-6 py-3 bg-lilas hover:bg-roxo text-white rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105">
                            Cadastrar Evento
                        </button>
                    </Link>

                </div>
            </div>
        </main>
    )
}
