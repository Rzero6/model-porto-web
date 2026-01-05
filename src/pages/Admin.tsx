import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, FolderKanban, Users2, Camera, Images } from "lucide-react";
import { Link } from "react-router-dom";
import PersonalInfoManager from "@/components/protected/PersonalInfoManager";
import DigitalsManager from "@/components/protected/DigitalsManager";
import PortfoliosManager from "@/components/protected/PortfoliosManager";
import { useModel } from "@/hooks/useModel";
import ClientsManager from "@/components/protected/ClientsManager";
import Logout from "@/components/LogoutButton";
import { auth } from "@/lib/firebase";


const Admin = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const { model, loading, saveData } = useModel();

    return (
        <div className="min-h-screen bg-background py-3 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary">
                        Admin Dashboard
                    </h1>

                    <div className="flex justify-between items-center gap-2">
                        <Link to="/" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                                <Home className="w-4 h-4 mr-2" />
                                <span>Back to Portfolio</span>
                            </Button>
                        </Link>
                        <Logout />
                    </div>
                </div>
                <h3 className="text-sm text-primary mb-2">
                    {auth.currentUser?.email}
                </h3>
                <Tabs value={activeTab} onValueChange={setActiveTab} >
                    <TabsList >
                        <TabsTrigger value="personal" className="flex items-center gap-2">
                            <FolderKanban className="w-4 h-4" />
                            <span className="hidden sm:inline">Personal Info</span>
                        </TabsTrigger>
                        <TabsTrigger value="portfolios" className="flex items-center gap-2">
                            <Images className="w-4 h-4" />
                            <span className="hidden sm:inline">Portfolios</span>
                        </TabsTrigger>
                        <TabsTrigger value="digitals" className="flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            <span className="hidden sm:inline">Digitals</span>
                        </TabsTrigger>
                        <TabsTrigger value="clients" className="flex items-center gap-2">
                            <Users2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Clients</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal">
                        <PersonalInfoManager model={model ?? null} loading={loading} saveData={saveData} />
                    </TabsContent>

                    <TabsContent value="portfolios">
                        <PortfoliosManager model={model ?? null} loading={loading} saveData={saveData} />
                    </TabsContent>

                    <TabsContent value="digitals">
                        <DigitalsManager model={model ?? null} loading={loading} saveData={saveData} />
                    </TabsContent>
                    <TabsContent value="clients">
                        <ClientsManager model={model ?? null} loading={loading} saveData={saveData} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
