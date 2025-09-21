import { useAuthActions } from "@/hooks/useAuthActions";
import { LayoutDashboard, LogOut, MessageCircle, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

const navigation = [
    {
        id: 1,
        name: "Dashboard",
        href: "/admin/",
        icon: LayoutDashboard,
    },
    {
        id: 2,
        name: "Chat",
        href: "/admin/chat",
        icon: MessageCircle,
    },
    {
        id: 3,
        name: "Perfil",
        href: "/admin/profile",
        icon: User,
    },
]

const Navbar = () => {
    const {logout} = useAuthActions();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className = {`border-b bg-white ${isScrolled ? "shadow-md" : ""}`}>
            <nav className="flex items-center justify-center gap-6 px-6 py-3">
                {
                    navigation.map((item) => (
                        <NavLink key = {item.id} to = {item.href} className = {({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"}`} end>
                            <item.icon className = "w-5 h-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    ))
                }
                <Button onClick = {logout}>
                    <LogOut className = "w-5 h-5" />
                    Cerrar sesión
                </Button>
            </nav>
        </header>
    )
}

export default Navbar