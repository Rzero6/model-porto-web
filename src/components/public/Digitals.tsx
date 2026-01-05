import { motion } from "framer-motion";
import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import type { Digital, SectionProps } from "@/types/ModelInfo";

export const Digitals = ({ model }: SectionProps) => {
    const [selectedImage, setSelectedImage] = useState<Digital | null>(null);

    return (
        <section id="digitals" className="section-padding bg-background">
            <div className="container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                        Agency Submission
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                        Digitals / <span className="italic text-primary">Polaroids</span>
                    </h2>
                    <p className="font-sans text-muted-foreground max-w-lg mx-auto">
                        Natural, unretouched photos for agency and casting reference
                    </p>
                </motion.div>

                {/* Digitals Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                >
                    {model.digitals.map((image, index) => (
                        <motion.div
                            key={image.src}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative aspect-3/4 overflow-hidden bg-muted cursor-pointer group"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Bottom label */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent">
                                <span className="font-sans text-xs text-ivory/80 tracking-wide">
                                    {image.alt.replace("Digital - ", "")}
                                </span>
                            </div>

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                            {/* Center view text */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="font-sans text-xs tracking-widest uppercase text-ivory">
                                    View
                                </span>
                            </div>
                        </motion.div>

                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <ImageLightbox
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </section>
    );
};
