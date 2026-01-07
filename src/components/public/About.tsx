import { motion } from "framer-motion";
import type { SectionProps } from "@/types/ModelInfo";
export const About = ({ model }: SectionProps) => {
    return (
        <section id="about" className="section-padding bg-background">
            <div className="container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-3/4 overflow-hidden">
                            <img
                                src={model.profileImage}
                                alt={model.name + " portrait"}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block"
                        >
                            About
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-tight"
                        >
                            Elegance in
                            <br />
                            <span className="italic text-primary">Every Frame</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-4"
                        >
                            {model.biography.split("\n\n").map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
