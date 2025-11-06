import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { logout, getLoggedUser } from '../services/Auth'
import logo from "../assets/logofutfem.png"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const usuario = getLoggedUser()

    const navigation = usuario
        ? [
            { name: 'Home', href: '/' },
            { name: 'Mapa', href: '/mapa' },
            { name: 'Encontro', href: '/encontro' },
        ]
        : [
            { name: 'Home', href: '/' },
            { name: 'Cadastro', href: '/login?tab=register' },
            { name: 'Login', href: '/login?tab=login' },
        ]

    return (
        <Disclosure as="nav" className="font-body relative border-b-2 shadow-md shadow-roxo/50 border-roxo bg-gray-50">
            <div className="px-2 sm:px-8 lg:px-10">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-950 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                alt="FutFem"
                                src={logo}
                                className="h-28 w-auto"
                            />
                        </div>
                    </div>
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2">
                        <div className="flex space-x-4 justify-center">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        'text-gray-950 hover:bg-verde/30 hover:text-verde',
                                        'rounded-2xl px-3 py-2 text-lg font-medium',
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {usuario ? (
                            <div className="relative">
                                <Menu as="div" className="relative">
                                    <MenuButton className="flex focus:outline-none">
                                        <span className="sr-only">Open user menu</span>
                                        <div className="rounded-full bg-gray-10/5 p-1 text-gray-950 hover:bg-verde/20 hover:text-verde">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>

                                        </div>

                                    </MenuButton>

                                    <MenuItems className="absolute right-0 mt-2 w-48 z-50 origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem as={Link} to="/perfil" className="block px-4 py-2 text-sm text-gray-950 rounded-md hover:bg-verde/70">
                                            Perfil
                                        </MenuItem>
                                        <MenuItem as="button" onClick={logout} className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-950 rounded-md hover:bg-verde/70">
                                            Sair
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="rounded-full bg-gray-10/5 p-1 text-gray-950 hover:bg-verde/20 hover:text-verde"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as={Link}
                            to={item.href}
                            className={classNames(
                                'block rounded-md px-3 py-2 text-sm font-medium text-gray-950 hover:bg-white/10 hover:text-white',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure >
    )
}
