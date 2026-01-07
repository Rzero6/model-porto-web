import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Digital } from "@/types/ModelInfo";

interface ImageLightboxProps {
    image: Digital | null;
    onClose: () => void;
}

export const ImageLightbox = ({ image, onClose }: ImageLightboxProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (image) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [image, onClose]);

    return (
        <AnimatePresence>
            {image && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-soft-black/95 p-4 md:p-8"
                    onClick={onClose}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-ivory/70 hover:text-ivory transition-colors z-10"
                        aria-label="Close lightbox"
                    >
                        <X size={32} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
                        onClick={onClose}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="max-w-full max-h-full object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                            <motion.p
                                initial={{ backgroundSize: "0% 100%" }}
                                animate={{ backgroundSize: "100% 100%" }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                className="font-sans text-sm text-primary-foreground px-2 py-1 inline-block"
                                style={{
                                    background: "linear-gradient(to right, var(--primary), var(--primary))",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "left center",
                                }}
                            >
                                {image.alt}
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
