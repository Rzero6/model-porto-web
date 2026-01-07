import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageLightbox } from "./ImageLightbox";
import type { Portfolio, SectionProps } from "@/types/ModelInfo";
import { portfolioCategory } from "@/data/optionsData";

export const Portfolios = ({ model }: SectionProps) => {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [selectedImage, setSelectedImage] = useState<Portfolio | null>(null);
    const allTabs = ["All", ...portfolioCategory];

    const filteredImages =
        activeCategory === "All"
            ? model.portofolios
            : model.portofolios.filter(
                (img) => img.category.toLowerCase() === activeCategory.toLowerCase()
            );
    const pattern: AspectRatio[] = ["portrait", "square", "square", "landscape"];

    let imagesToRender = reorderByPattern(filteredImages, pattern);


    const totalSquares = imagesToRender.filter(img => img.aspectRatio === "square").length;
    let remainingSquares = totalSquares;

    const variantViewText = {
        initial: { backgroundSize: "0% 100%" },
        whileHover: { backgroundSize: "100% 100%" },
    }
    return (
        <section id="portfolio" className="section-padding bg-cream">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                        Selected <span className="italic text-primary">Works</span>
                    </h2>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
                >
                    {allTabs.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`cursor-pointer font-sans text-sm tracking-widest uppercase transition-all duration-300 pb-1 border-b-2 ${activeCategory === category
                                ? "text-foreground border-primary"
                                : "text-muted-foreground border-transparent hover:text-foreground"
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <motion.div layout className="grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-1.5 auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[200px]">
                    <AnimatePresence mode="popLayout">
                        {imagesToRender.map((image, index) => {

                            if (image.aspectRatio === "square") {
                                remainingSquares--;
                            }
                            return (
                                <motion.div
                                    key={image.src}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.03 }}
                                    className={`relative overflow-hidden cursor-pointer group ${getGridClasses(image, index, remainingSquares)}`}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-soft-black/0 group-hover:bg-soft-black/50 transition-colors duration-300" />
                                    <motion.div
                                        initial="initial"
                                        whileHover="whileHover"
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <motion.span
                                            variants={variantViewText}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="font-sans text-xs tracking-widest uppercase text-primary-foreground px-2 py-1 inline-block"
                                            style={{
                                                background: "linear-gradient(to right, var(--primary), var(--primary))",
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "left center",
                                            }}
                                        >
                                            View
                                        </motion.span>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="text-xs text-accent uppercase">{image.category}</p>
                                            <h3 className="font-heading text-lg text-primary-foreground line-clamp-1">{image.alt}</h3>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
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

// Instagram grid logic:
// Portrait = 1 box (2 rows, 1 Columns)
// Square = 0.5 box (1 row, 1 Columns)
// Landscape = 2 boxes (2 rows, 2 columns)
const getGridClasses = (image: Portfolio, index: number, squaresLeft: number) => {
    switch (image.aspectRatio) {
        case "landscape":
            return "col-span-2 row-span-2";
        case "square":
            return squaresLeft > 0 ? "col-span-1 row-span-1 col-start-2 row-start-" + index : "col-span-1.5 row-span-2";
        case "portrait":
        default:
            return "col-span-1 row-span-2 ";
    }
};
type AspectRatio = "portrait" | "square" | "landscape";

const reorderByPattern = (images: Portfolio[], pattern: AspectRatio[]) => {
    const groups: Record<AspectRatio, Portfolio[]> = {
        portrait: [],
        square: [],
        landscape: [],
    };

    images.forEach(img => {
        const key: AspectRatio = img.aspectRatio && ["portrait", "square", "landscape"].includes(img.aspectRatio)
            ? (img.aspectRatio as AspectRatio)
            : "portrait";
        groups[key].push(img);
    });

    // If total squares is odd, remove the last one
    let lastSquare: Portfolio | null = null;
    if (groups.square.length % 2 === 1) {
        lastSquare = groups.square.pop()!;
    }

    const result: Portfolio[] = [];
    let patternIndex = 0;

    while (groups.portrait.length || groups.square.length || groups.landscape.length) {
        let type: AspectRatio = pattern[patternIndex % pattern.length];

        // Skip square if none left
        if (type === "square" && groups.square.length === 0) {
            patternIndex++;
            continue;
        }

        if (groups[type].length > 0) {
            result.push(groups[type].shift()!);
        }

        patternIndex++;
    }

    // Append the last square at the end
    if (lastSquare) {
        result.push(lastSquare);
    }

    return result;
};




