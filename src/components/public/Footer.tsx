import { motion } from "framer-motion";
import { Instagram, ArrowUp } from "lucide-react";
import { TikTokIcon } from "@/data/TiktokIcon";
import type { SectionProps } from "@/types/ModelInfo";

export const Footer = ({ model }: SectionProps) => {

    return (
        <footer className="bg-soft-black text-ivory py-12 md:py-16">
            <div className="container-wide px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    {/* Logo / Name */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-2xl tracking-wide mb-2 text-primary">
                            {model.name}
                        </h3>
                        <p className="font-sans text-xs tracking-widest uppercase text-ivory/50">
                            {model.tagline}
                        </p>
                    </div>

                    {/* Social / Instagram */}
                    {model.instagram && (
                        <a
                            href={`https://instagram.com/${model.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-ivory/70 hover:text-ivory transition-colors group"
                        >
                            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-sans text-sm tracking-wide">
                                Follow on Instagram
                            </span>
                        </a>
                    )}
                    {model.tiktok && (
                        <a
                            href={`https://instagram.com/${model.tiktok.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-ivory/70 hover:text-ivory transition-colors group"
                        >
                            <TikTokIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-sans text-sm tracking-wide">
                                Follow on Tiktok
                            </span>
                        </a>
                    )
                    }

                    {/* Back to Top */}
                    <a
                        href="/#"
                        className="flex cursor-pointer items-center gap-2 text-ivory/50 hover:text-ivory transition-colors group"
                        aria-label="Scroll to top"
                    >
                        <span className="font-sans text-xs tracking-widest uppercase">
                            Back to Top
                        </span>
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="border-t border-ivory/10 mt-8 pt-8 text-center"
                >
                    <p className="font-sans text-xs text-ivory/40 tracking-wide">
                        © {new Date().getFullYear()} {model.name}. All rights reserved.
                    </p>
                    <p className="font-sans text-xs text-ivory/30 mt-2">
                        For bookings and representation inquiries, please contact directly.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};
