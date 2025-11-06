import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import PaginaNaoEncontrada from "../pages/PaginaNaoEncontrada"
import Home from "../pages/Home"
import PrivateRoute from "../services/Auth"
import Perfil from "../pages/Perfil"
import Mapa from "../pages/Mapa"
import AdminLayout from "../pages/AdminLayout"
import AdminDashboard from "../pages/AdminDashboard"
import AdminCadastro from "../pages/AdminCadastro"
import LoginRegister from "../pages/LoginRegister"
import Encontro from "../pages/Encontro"

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
                path: "encontro",
                element: <PrivateRoute requiredRole="user">
                    <Encontro />
                </PrivateRoute>
            },
            {
                path: "perfil",
                element: <PrivateRoute requiredRole="user">
                    <Perfil />
                </PrivateRoute>
            },
            {
                path: "mapa",
                element: <PrivateRoute requiredRole="user">
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
                element: <PrivateRoute requiredRole="admin">
                    <AdminDashboard />
                </PrivateRoute>
            },
            {
                path: "/admin/evento",
                element: <PrivateRoute requiredRole="admin">
                    <AdminCadastro />
                </PrivateRoute>
            }
        ]
    }
])