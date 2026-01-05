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

const Index = () => {
    const { model } = useModel();
    return (
        <main className="min-h-screen">
            {!model ? null : (
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
            )}
        </main>
    );
};

export default Index;
