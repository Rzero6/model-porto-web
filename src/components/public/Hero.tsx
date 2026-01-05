import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { SectionProps } from "@/types/ModelInfo";

export const Hero = ({ model }: SectionProps) => {
    return (
        <section className="relative min-h-screen flex items-end pb-10 justify-center overflow-hidden bg-primary">
            {/* Background Image */}
            <div className="absolute inset-0">
                {model.heroImage && (
                    <img
                        src={model.heroImage}
                        alt={model.name}
                        className="w-full h-full object-cover object-top"
                        loading="eager"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-soft-black/70 via-soft-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                {model.tagline && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-ivory/80 mb-4"
                    >
                        {model.tagline}
                    </motion.p>
                )}

                {model.name && (
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-serif text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 tracking-tight"
                    >
                        {model.name}
                    </motion.h1>
                )}

                {model.location && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-ivory/70 font-sans text-sm tracking-wide"
                    >
                        <span>{model.location}</span>
                    </motion.div>
                )}

                <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    href="#about"
                    className="inline-block mt-12 md:mt-16 text-ivory/60 hover:text-ivory transition-colors"
                    aria-label="Scroll to about section"
                >
                    <ChevronDown size={32} className="animate-bounce" />
                </motion.a>
            </div>
        </section>
    );
};
