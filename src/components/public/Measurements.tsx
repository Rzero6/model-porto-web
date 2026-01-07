import { motion } from "framer-motion";
import type { SectionProps } from "@/types/ModelInfo";
import { cmToFeetInches, cmToIn, euToUsShoes, kgToLb } from "@/lib/utils";

export const Measurements = ({ model }: SectionProps) => {

    const measurementItems = model
        ? [
            {
                label: "Height",
                value: `${model.details.height} cm / ${cmToFeetInches(
                    model.details.height
                )}`,
            },
            {
                label: "Weight",
                value: `${model.details.weight} kg / ${kgToLb(model.details.weight)} lb`,
            },
            {
                label: "Bust",
                value: `${model.details.bust} cm / ${cmToIn(model.details.bust)}"`,
            },
            {
                label: "Waist",
                value: `${model.details.waist} cm / ${cmToIn(model.details.waist)}"`,
            },
            {
                label: "Hips",
                value: `${model.details.hips} cm / ${cmToIn(model.details.hips)}"`,
            },
            {
                label: "Shoes",
                value: `${model.details.shoes} EU / ${euToUsShoes(
                    model.details.shoes
                )} US`,
            },
            { label: "Hair", value: model.details.hair },
            { label: "Ethnicity", value: model.details.ethnicity },
            {
                label: "Languages",
                value: model.details.languages.join(", "),
            },
        ]
        : [];




    return (
        <section id="details" className="section-padding bg-secondary">
            <div className="container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                        Specifications
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                        Measurements & <span className="italic text-primary">Details</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-background border border-border shadow-soft">
                        {measurementItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                                className={`flex justify-between items-center py-4 px-6 md:px-8 ${index !== measurementItems.length - 1 ? "border-b border-border" : ""
                                    }`}
                            >
                                <span className="font-sans text-sm tracking-widest uppercase text-muted-foreground text-start">
                                    {item.label}
                                </span>
                                <span className="font-serif sm:text-xs md:text-md lg:text-lg text-foreground text-end">
                                    {item.value}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
