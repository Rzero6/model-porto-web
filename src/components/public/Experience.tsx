import { motion } from "framer-motion";
import type { Client, SectionProps } from "@/types/ModelInfo";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarAbbreviation } from "@/lib/utils";
import { Marquee, MarqueeContent, MarqueeItem } from "../ui/shadcn-io/marquee";

export const Experience = ({ model }: SectionProps) => {
    return (
        <section
            className="bg-background"
        >

            {/* Header */}
            <div className="p-10 container-narrow">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 block">
                        Collaborations
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                        Clients & <span className="italic text-primary">Experience</span>
                    </h2>
                </motion.div>
            </div>

            {/* Full-width Marquee */}
            {model?.clients?.length < 6 && (
                <MarqueeList clients={model.clients} />
            )}

            {/* Contact section */}
            <div className="p-10 container-narrow">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="font-sans text-muted-foreground mb-4">
                        Interested in collaborating?
                    </p>
                    <a
                        href="#contact"
                        className="inline-block font-sans text-sm tracking-widest uppercase border-b border-primary text-primary hover:text-foreground hover:border-foreground transition-colors pb-1"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

const MarqueeList = ({ clients }: { clients: Client[] }) => (
    <Marquee>
        <MarqueeContent>
            {clients.map((client) => (
                <MarqueeItem key={client.name}>
                    <ClientCard client={client} />
                </MarqueeItem>
            ))}
        </MarqueeContent>
    </Marquee>
);
const ClientCard = ({ client }: { client: Client }) => (
    <Card className="p-3 hover:border-primary">
        <div className="flex justify-between gap-4">
            <Avatar className="w-15 h-15">
                <AvatarImage src={client.logo} />
                <AvatarFallback>{getAvatarAbbreviation(client.name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                    {client.name}
                </h4>
                {/* Clickable URL */}
                {client.url && (
                    <a
                        href={client.url.startsWith("http") ? client.url : `https://${client.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline break-all text-center"
                    >
                        Visit {client.name}
                    </a>
                )}
            </div>
        </div>
    </Card>
);