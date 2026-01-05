import { useState, useEffect, useRef } from "react";
import { Loader2, Save, Edit, X, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ModelInfo, Client } from "@/types/ModelInfo";

interface ClientsManagerProps {
    model: ModelInfo | null;
    loading: boolean;
    saveData: (data: Omit<ModelInfo, "id" | "created_at">) => Promise<void>;
}

const ClientsManager = ({ model, loading: isLoading, saveData }: ClientsManagerProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (model) setClients(model.clients || []);
    }, [model]);

    const handleAdd = () => {
        setClients(prev => [...prev, { name: "", logo: "" }]);
        setTimeout(() => {
            containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }, 0);
    };

    const handleRemove = (index: number) =>
        setClients(clients.filter((_, i) => i !== index));

    const handleChange = (index: number, field: keyof Client, value: string) => {
        const updated = [...clients];
        updated[index] = { ...updated[index], [field]: value };
        setClients(updated);
    };

    const handleSave = async () => {
        if (!model) return;
        await saveData({ ...model, clients });
        setIsEditMode(false);
    };

    const handleCancel = () => {
        setClients(model?.clients || []);
        setIsEditMode(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Clients</h2>
                {!isEditMode && (
                    <Button variant="outline" onClick={() => setIsEditMode(true)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                )}
                {isEditMode && (
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button onClick={handleAdd} variant="outline">
                            <Plus className="mr-2 h-4 w-4" /> Add Client
                        </Button>
                        <Button type="button" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Clients
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {/* Cards */}
            {clients.length === 0 && !isEditMode ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No clients added yet.</p>
                    <Button className="mt-4" variant="outline" onClick={() => setIsEditMode(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Client
                    </Button>
                </div>
            ) : (
                <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-125 overflow-auto">
                    {clients.map((client, index) => (
                        <Card key={index} className="overflow-hidden">
                            {/* Logo */}
                            {client.logo && (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-48 w-full object-contain"
                                    onError={(e) =>
                                        ((e.target as HTMLImageElement).style.display = "none")
                                    }
                                />
                            )}

                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base">
                                    Client #{index + 1}
                                </CardTitle>
                                {isEditMode && (
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={client.name}
                                            onChange={(e) => handleChange(index, "name", e.target.value)}
                                            placeholder="Client Name"
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {client.name || "Not set"}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Client URL</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={client.url || ""}
                                            onChange={(e) => handleChange(index, "url", e.target.value)}
                                            placeholder="https://..."
                                        />
                                    ) : (
                                        <p className="text-sm break-all text-muted-foreground">
                                            {client.url || "Not set"}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Logo URL</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={client.logo || ""}
                                            onChange={(e) => handleChange(index, "logo", e.target.value)}
                                            placeholder="https://..."
                                        />
                                    ) : (
                                        <p className="text-sm break-all text-muted-foreground">
                                            {client.logo || "Not set"}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientsManager;
