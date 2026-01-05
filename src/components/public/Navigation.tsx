import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DuplicateModelButton } from "../DuplicateButton";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#digitals", label: "Digitals" },
    { href: "#details", label: "Details" },
    { href: "#contact", label: "Contact" },
];

interface NavigationProps {
    name?: string;
}

export const Navigation = ({ name }: NavigationProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-background/70 backdrop-blur-md shadow-soft py-4"
                : "bg-transparent py-6"
                }`}
        >
            <nav className="container-wide px-6 lg:px-12 flex items-center justify-between">
                <a
                    href="#"
                    className={`font-serif text-xl md:text-2xl tracking-wide
                         hover:text-foreground transition-colors
                        ${isScrolled ? "text-foreground hover:text-primary" : "text-primary-foreground hover:text-foreground"}
                      `}

                >
                    {name || "Model Portfolio"}
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={`font-sans text-sm tracking-widest uppercase link-underline transition-colors
                                    ${isScrolled ? "text-foreground hover:text-primary" : "text-primary-foreground hover:text-foreground"}`
                                }
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden p-2 
                        ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-background/70 backdrop-blur-md shadow-elegant"
                    >
                        <ul className="flex flex-col items-center py-8 gap-6">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="font-sans text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};
