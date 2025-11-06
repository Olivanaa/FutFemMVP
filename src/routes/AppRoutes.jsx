import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import PaginaNaoEncontrada from "../pages/PaginaNaoEncontrada"
import Home from "../pages/Home"
import Cadastro from "../pages/Cadastro"
import PrivateRoute from "../services/Auth"
import Eventos from "../pages/Eventos"
import Perfil from "../pages/Perfil"
import Mapa from "../pages/Mapa"
import AdminLayout from "../pages/AdminLayout"
import AdminDashboard from "../pages/AdminDashboard"
import AdminCadastro from "../pages/AdminCadastro"
import LoginRegister from "../pages/LoginRegister"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <PaginaNaoEncontrada />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <LoginRegister />
            },
            {
                path: "cadastro",
                element: <Cadastro />
            },
            {
                path: "evento",
                element: <PrivateRoute>
                    <Eventos />
                </PrivateRoute>
            },
            {
                path: "perfil",
                element: <PrivateRoute>
                    <Perfil />
                </PrivateRoute>
            },
            {
                path: "mapa",
                element: <PrivateRoute>
                    <Mapa />
                </PrivateRoute>
            },

        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <PrivateRoute>
                    <AdminDashboard />
                </PrivateRoute>
            },
            {
                path: "/admin/evento",
                element: <PrivateRoute>
                    <AdminCadastro />
                </PrivateRoute>
            }
        ]
    }
])