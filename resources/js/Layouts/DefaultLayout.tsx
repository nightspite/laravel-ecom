import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { ListOrdered, ShoppingCart } from "lucide-react";

export default function DefaultLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user?: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "admin";

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex w-full">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {isAuthenticated ? (
                                <div className="hidden space-x-8 lg:-my-px lg:ms-10 lg:flex w-full">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("products.index")}
                                        active={route().current(
                                            "products.index"
                                        )}
                                    >
                                        Products
                                    </NavLink>
                                    {isAdmin ? (
                                        <>
                                            <NavLink
                                                href={route(
                                                    "admin_products.index"
                                                )}
                                                active={route().current(
                                                    "admin_products.index"
                                                )}
                                            >
                                                Products(admin)
                                            </NavLink>
                                            <NavLink
                                                href={route(
                                                    "admin_orders.index"
                                                )}
                                                active={route().current(
                                                    "admin_orders.index"
                                                )}
                                            >
                                                Orders(admin)
                                            </NavLink>
                                        </>
                                    ) : null}
                                    <NavLink
                                        className="!ml-auto"
                                        href={route("orders.index")}
                                        active={route().current("orders.index")}
                                    >
                                        <ListOrdered
                                            size={16}
                                            className="mr-2"
                                        />
                                        Orders
                                    </NavLink>
                                    <NavLink
                                        href={route("cart.index")}
                                        active={route().current("cart.index")}
                                    >
                                        <ShoppingCart
                                            size={16}
                                            className="mr-2"
                                        />
                                        Cart
                                    </NavLink>
                                </div>
                            ) : null}
                        </div>

                        {isAuthenticated ? (
                            <div className="hidden lg:flex lg:items-center lg:ms-6 shrink-0">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.first_name}{" "}
                                                    {user.last_name}
                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden space-x-8 lg:-my-px lg:ms-10 lg:flex">
                                <NavLink
                                    href={route("login")}
                                    active={route().current("login")}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    href={route("register")}
                                    active={route().current("register")}
                                >
                                    Register
                                </NavLink>
                            </div>
                        )}
                        <div className="-me-2 flex items-center lg:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " lg:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("products.index")}
                            active={route().current("products.index")}
                        >
                            Products
                        </ResponsiveNavLink>
                        {isAdmin ? (
                            <>
                                <ResponsiveNavLink
                                    href={route("admin_products.index")}
                                    active={route().current(
                                        "admin_products.index"
                                    )}
                                >
                                    Products(admin)
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin_orders.index")}
                                    active={route().current(
                                        "admin_orders.index"
                                    )}
                                >
                                    Orders(admin)
                                </ResponsiveNavLink>
                            </>
                        ) : null}
                        <ResponsiveNavLink
                            href={route("orders.index")}
                            active={route().current("orders.index")}
                        >
                            <ListOrdered size={16} className="mr-2" />
                            Orders
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("cart.index")}
                            active={route().current("cart.index")}
                        >
                            <ShoppingCart size={16} className="mr-2" />
                            Cart
                        </ResponsiveNavLink>
                    </div>

                    {isAuthenticated ? (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.first_name} {user.last_name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("login")}
                                active={route().current("login")}
                            >
                                Login
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("register")}
                                active={route().current("register")}
                            >
                                Register
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
