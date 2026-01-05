import { motion } from "framer-motion";
import { Mail, Instagram, Phone } from "lucide-react";
import type { SectionProps } from "@/types/ModelInfo";
import { TikTokIcon } from "@/data/TiktokIcon";
import { formatWhatsAppURL } from "@/lib/utils";

export const Contact = ({ model }: SectionProps) => {
    return (
        <section id="contact" className="section-padding bg-charcoal text-ivory">
            <div className="container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-ivory/60 mb-4 block">
                        Get in Touch
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory">
                        Let's <span className="italic text-primary">Collaborate</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto"
                >
                    {/* Email */}
                    <a
                        href={`mailto:${model.email}`}
                        className="group flex flex-col items-center text-center p-6 border border-ivory/20 hover:border-ivory/40 transition-colors"
                    >
                        <Mail className="w-6 h-6 mb-4 text-champagne group-hover:scale-110 transition-transform" />
                        <span className="font-sans text-xs tracking-widest uppercase text-ivory/60 mb-2">
                            Email
                        </span>
                        <span className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">
                            {model.email}
                        </span>
                    </a>

                    {/* WhatsApp */}
                    {model.whatsapp && (
                        <a
                            href={formatWhatsAppURL(model.whatsapp, model.name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center text-center p-6 border border-ivory/20 hover:border-ivory/40 transition-colors"
                        >
                            <Phone className="w-6 h-6 mb-4 text-champagne group-hover:scale-110 transition-transform" />
                            <span className="font-sans text-xs tracking-widest uppercase text-ivory/60 mb-2">
                                WhatsApp
                            </span>
                            <span className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">
                                {model.whatsapp}
                            </span>
                        </a>
                    )}

                    {/* Instagram */}
                    {model.instagram && (
                        <a
                            href={`https://instagram.com/${model.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center text-center p-6 border border-ivory/20 hover:border-ivory/40 transition-colors"
                        >
                            <Instagram className="w-6 h-6 mb-4 text-champagne group-hover:scale-110 transition-transform" />
                            <span className="font-sans text-xs tracking-widest uppercase text-ivory/60 mb-2">
                                Instagram
                            </span>
                            <span className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">
                                {model.instagram}
                            </span>
                        </a>
                    )
                    }

                    {/* Tiktok */}
                    {model.tiktok && (
                        <a
                            href={`https://tiktok.com/${model.tiktok}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center text-center p-6 border border-ivory/20 hover:border-ivory/40 transition-colors"
                        >
                            <TikTokIcon className="w-6 h-6 mb-4 text-champagne group-hover:scale-110 transition-transform" />
                            <span className="font-sans text-xs tracking-widest uppercase text-ivory/60 mb-2">
                                TikTok
                            </span>
                            <span className="font-serif text-lg text-ivory group-hover:text-champagne transition-colors">
                                {model.instagram}
                            </span>
                        </a>
                    )
                    }
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center text-ivory/50 font-sans text-sm mt-12"
                >
                    Currently based in {model.location}
                </motion.p>
            </div>
        </section>
    );
};
