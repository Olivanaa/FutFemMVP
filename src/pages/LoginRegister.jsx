import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, MapPinHouse, Calendar, Phone } from "lucide-react"
import ilustracao from "../assets/ilustracao.png"
import { handleCep } from "../utils/Cep"


const niveis = ["Iniciante", "Intermediário", "Avançado", "Profissional"]
const posicoes = [
    "Goleira",
    "Zagueira Central",
    "Lateral Direita",
    "Lateral Esquerda",
    "Volante",
    "Meia Ofensiva",
    "Meia Defensiva",
    "Atacante",
    "Ponta Direita",
    "Ponta Esquerda",
    "Centroavante",
]

export default function LoginRegister() {
    const [activeTab, setActiveTab] = useState("login")
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const tab = params.get("tab")
        if (tab === "register" || tab === "login") {
            setActiveTab(tab)
        }
    }, [location])

    const [loginEmail, setLoginEmail] = useState("")
    const [loginSenha, setLoginSenha] = useState("")
    const [loginError, setLoginError] = useState("")

    const [cadastroNome, setCadastroNome] = useState("")
    const [cadastroNascimento, setCadastroNascimento] = useState("")
    const [cadastroTelefone, setCadastroTelefone] = useState("")
    const [cadastroEmail, setCadastroEmail] = useState("")
    const [cadastroSenha, setCadastroSenha] = useState("")

    const [cadastroCEP, setCadastroCEP] = useState("")
    const [cepErro, setCepErro] = useState("")
    const [cadastroLogradouro, setCadastroLogradouro] = useState("")
    const [cadastroNumero, setCadastroNumero] = useState("")
    const [cadastroComplemento, setCadastroComplemento] = useState("")
    const [cadastroBairro, setCadastroBairro] = useState("")
    const [cadastroCidade, setCadastroCidade] = useState("")
    const [cadastroEstado, setCadastroEstado] = useState("")

    const [cadastroPosicao, setCadastroPosicao] = useState("")
    const [cadastroNivel, setCadastroNivel] = useState("")

    const [cadastroErro, setCadastroErro] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!loginEmail || !loginSenha) {
            setLoginError("Por favor, preencha todos os campos")
            return;
        }

        setLoginError("")

        try {
            const response = await fetch(`http://localhost:3000/usuarios?email=${loginEmail}&senha=${loginSenha}`)
            const data = await response.json()

            if (data.length === 0) {
                setLoginError("Email ou senha incorretos")
                return
            }

            const usuario = data[0]
            console.log("Usuário logado:", usuario)

            const token = btoa(`${usuario.email}:${usuario.senha}`)
            localStorage.setItem("token", token)
            localStorage.setItem("usuario", JSON.stringify(usuario))

            window.location.href = "/"

        } catch (error) {
            console.error("Erro ao fazer login:", error)
            setLoginError("Erro ao tentar logar. Tente novamente mais tarde.")
        }
    }

    const calcularIdade = (dataNascimento) => {
        const hoje = new Date()
        const nascimento = new Date(dataNascimento)
        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const mes = hoje.getMonth() - nascimento.getMonth()

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--
        }
        return idade
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (
            !cadastroNome ||
            !cadastroNascimento ||
            !cadastroTelefone ||
            !cadastroEmail ||
            !cadastroSenha ||
            !cadastroPosicao ||
            !cadastroNivel ||
            !cadastroCEP ||
            !cadastroLogradouro ||
            !cadastroBairro ||
            !cadastroCidade ||
            !cadastroEstado
        ) {
            setCadastroErro("Por favor, preencha todos os campos obrigatórios")
            return
        }

        setCadastroErro("")

        const usuario = {
            nome: cadastroNome,
            nascimento: cadastroNascimento,
            idade: calcularIdade(cadastroNascimento),
            telefone: cadastroTelefone,
            email: cadastroEmail,
            senha: cadastroSenha,
            posicao: cadastroPosicao,
            nivel: cadastroNivel,
            role: "user",
            endereco: {
                cep: cadastroCEP,
                logradouro: cadastroLogradouro,
                numero: cadastroNumero,
                complemento: cadastroComplemento,
                bairro: cadastroBairro,
                cidade: cadastroCidade,
                estado: cadastroEstado,
            },
            inscricoes: [],
            documentos: []
        }
        console.log("Cadastro:", usuario)

        try {
            const response = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuario),
            })
            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário")
            }

            const data = await response.json()
            console.log("Usuário cadastrado com sucesso:", data)

            setCadastroNome("")
            setCadastroNascimento("")
            setCadastroTelefone("")
            setCadastroEmail("")
            setCadastroSenha("")
            setCadastroPosicao("")
            setCadastroNivel("")
            setCadastroCEP("")
            setCadastroLogradouro("")
            setCadastroNumero("")
            setCadastroComplemento("")
            setCadastroBairro("")
            setCadastroCidade("")
            setCadastroEstado("")

            alert("Cadastro realizado com sucesso!")
            navigate("/login?tab=login")
        } catch (error) {
            console.error(error)
            setCadastroErro("Erro ao cadastrar usuário. Tente novamente mais tarde.")
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
        setCadastroLogradouro(resultado.rua)
        setCadastroBairro(resultado.bairro)
        setCadastroCidade(resultado.cidade)
        setCadastroEstado(resultado.estado)
    }

    return (
        <main className="bg-gradient-to-r from-lilas/40 via-verde/10 to-lilas/20 p-10">
            <div className="w-full mx-auto flex items-center justify-center">
                <div className="flex flex-col lg:flex-row w-full lg:min-h-[700px] max-w-screen-xl bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-12">
                        <div className="flex mb-6 border-b-2 border-gray-200">
                            <button
                                onClick={() => setActiveTab("login")}
                                className={`flex-1 py-4 font-semibold text-center border-b-4 transition-colors ${activeTab === "login"
                                    ? "border-lilas text-lilas"
                                    : "border-transparent text-gray-500 hover:text-lilas"
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab("register")}
                                className={`flex-1 py-4 font-semibold text-center border-b-4 transition-colors ${activeTab === "register"
                                    ? "border-lilas text-lilas"
                                    : "border-transparent text-gray-500 hover:text-lilas"
                                    }`}
                            >
                                Cadastro
                            </button>
                        </div>
                        {activeTab === "login" ? (
                            <form className="flex flex-col gap-4 text-gray-400" onSubmit={handleLogin}>
                                {loginError && (
                                    <p className="text-red-500 text-sm text-center">{loginError}</p>
                                )}
                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        E-mail
                                    </label>
                                    <Mail className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>
                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Senha
                                    </label>
                                    <Lock className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Senha"
                                        value={loginSenha}
                                        onChange={(e) => setLoginSenha(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-lilas hover:bg-roxo cursor-pointer text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition"
                                >
                                    Entrar
                                </button>
                            </form>
                        ) : (
                            <form className="flex flex-col gap-4 text-gray-400" onSubmit={handleRegister}>
                                {cadastroErro && (
                                    <p className="text-red-500 text-sm text-center">{cadastroErro}</p>
                                )}

                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Nome completo
                                    </label>
                                    <User className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Digite seu nome completo"
                                        value={cadastroNome}
                                        onChange={(e) => setCadastroNome(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>

                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Data de nascimento
                                    </label>
                                    <Calendar className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        id="data-nascimento"
                                        type="date"
                                        value={cadastroNascimento}
                                        onChange={(e) => setCadastroNascimento(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>

                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Telefone
                                    </label>
                                    <Phone className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        type="tel"
                                        placeholder="Digite seu telefone"
                                        value={cadastroTelefone}
                                        onChange={(e) => setCadastroTelefone(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>

                                <div className="border rounded-xl shadow-sm p-4 bg-gray-50">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPinHouse className="w-5 h-5 text-gray-400" />
                                        <h3 className="text-sm font-semibold text-gray-4000">Endereço</h3>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                                        <div className="col-span-1 lg:col-span-12 focus-within:text-gray-900">
                                            <label className="block text-sm font-medium mb-1">CEP</label>
                                            <input
                                                type="text"
                                                placeholder="Digite seu CEP"
                                                value={cadastroCEP}
                                                onChange={(e) => setCadastroCEP(e.target.value)}
                                                onBlur={async () => {
                                                    if (cadastroCEP.trim() !== "") {
                                                        await buscarEndereco(cadastroCEP)
                                                    }
                                                }}
                                                maxLength={8}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                            {cepErro && (
                                                <p className="text-red-500 text-sm mt-1">{cepErro}</p>
                                            )}
                                        </div>
                                        <div className="col-span-1 lg:col-span-8">
                                            <input
                                                type="text"
                                                placeholder="Logradouro"
                                                value={cadastroLogradouro}
                                                onChange={(e) => setCadastroLogradouro(e.target.value)}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                        </div>
                                        <div className="col-span-1 lg:col-span-4">
                                            <input
                                                type="text"
                                                placeholder="Número"
                                                value={cadastroNumero}
                                                onChange={(e) => setCadastroNumero(e.target.value)}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                        </div>
                                        <div className="col-span-1 lg:col-span-5">
                                            <input
                                                type="text"
                                                placeholder="Complemento"
                                                value={cadastroComplemento}
                                                onChange={(e) => setCadastroComplemento(e.target.value)}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                        </div>
                                        <div className="col-span-1 lg:col-span-7">
                                            <input
                                                type="text"
                                                placeholder="Bairro"
                                                value={cadastroBairro}
                                                onChange={(e) => setCadastroBairro(e.target.value)}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                        </div>
                                        <div className="col-span-1 lg:col-span-7">
                                            <input
                                                type="text"
                                                placeholder="Cidade"
                                                value={cadastroCidade}
                                                onChange={(e) => setCadastroCidade(e.target.value)}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                        </div>

                                        <div className="col-span-1 lg:col-span-5">
                                            <input
                                                type="text"
                                                placeholder="Estado"
                                                value={cadastroEstado}
                                                onChange={(e) => setCadastroEstado(e.target.value)}
                                                className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Posição
                                    </label>
                                    <select
                                        value={cadastroPosicao}
                                        onChange={(e) => setCadastroPosicao(e.target.value)}
                                        className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    >
                                        <option value="">Selecione sua posição</option>
                                        {posicoes.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Nível
                                    </label>
                                    <select
                                        value={cadastroNivel}
                                        onChange={(e) => setCadastroNivel(e.target.value)}
                                        className="px-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    >
                                        <option value="">Selecione seu nível</option>
                                        {niveis.map((n) => (
                                            <option key={n} value={n}>
                                                {n}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <Mail className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="Digite seu email"
                                        value={cadastroEmail}
                                        onChange={(e) => setCadastroEmail(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>
                                <div className="relative flex flex-col focus-within:text-gray-900">
                                    <label className="text-sm font-medium mb-1">
                                        Senha
                                    </label>
                                    <Lock className="w-5 h-5 absolute left-3 top-9 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Digite uma senha"
                                        value={cadastroSenha}
                                        onChange={(e) => setCadastroSenha(e.target.value)}
                                        className="pl-10 pr-4 py-2 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-verde focus:border-verde"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-lilas hover:bg-roxo cursor-pointer text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition"
                                >
                                    Cadastrar
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="lg:w-1/2 hidden lg:flex justify-center items-center bg-verde/20">
                        <img
                            src={ilustracao}
                            alt="Mulheres jogando futebol"
                            className="w-full max-w-md"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}