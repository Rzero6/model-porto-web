import { Navigation } from "@/components/public/Navigation";
import { Hero } from "@/components/public/Hero";
import { About } from "@/components/public/About";
import { Portfolios } from "@/components/public/Portfolios";
import { Digitals } from "@/components/public/Digitals";
import { Measurements } from "@/components/public/Measurements";
import { Experience } from "@/components/public/Experience";
import { Contact } from "@/components/public/Contact";
import { Footer } from "@/components/public/Footer";
import { useModel } from "@/hooks/useModel";
import { LoaderPinwheel } from "lucide-react";
const id = import.meta.env.VITE_FIREBASE_DATA;

const Index = () => {
    const { model } = useModel(id);
    return (
        <main className="min-h-screen">
            {model ? (
                <>
                    <Navigation name={model.name} />
                    <Hero model={model} />
                    <About model={model} />
                    <Portfolios model={model} />
                    <Digitals model={model} />
                    <Measurements model={model} />
                    <Experience model={model} />
                    <Contact model={model} />
                    <Footer model={model} />
                </>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-[#d4b5a0] via-[#c9a385] to-[#b8916d]">
                    <div className="absolute inset-0 bg-linear-to-t from-soft-black/70 via-soft-black/20 to-transparent" />
                    <LoaderPinwheel className="h-8 w-8 animate-spin text-ivory" />
                </div>
            )}
        </main>
    );
};

export default Index;
