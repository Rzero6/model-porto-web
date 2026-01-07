import { useState, useEffect, useRef } from "react";
import { Loader2, Save, Edit, X, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ModelInfo, Digital } from "@/types/ModelInfo";

interface DigitalsManagerProps {
    model: ModelInfo | null;
    loading: boolean;
    saveData: (data: Omit<ModelInfo, "id" | "created_at">) => Promise<void>;
}

const DigitalsManager = ({ model, loading: isLoading, saveData }: DigitalsManagerProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [digitals, setDigitals] = useState<Digital[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (model) setDigitals(model.digitals || []);
    }, [model]);

    const handleAdd = () => {
        setDigitals(prev => [...prev, { src: "", alt: "" }]);

        // Scroll to bottom after the state updates
        setTimeout(() => {
            containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }, 0);
    };
    const handleRemove = (index: number) => {
        const confirmDelete = globalThis.confirm("Are you sure want to delete?");
        if (!confirmDelete) return;
        setDigitals(digitals.filter((_, i) => i !== index));
    }

    const handleChange = (index: number, field: keyof Digital, value: string) => {
        const updated = [...digitals];
        updated[index] = { ...updated[index], [field]: value };
        setDigitals(updated);
    };

    const handleSave = async () => {
        if (!model) return;
        await saveData({ ...model, digitals });
        setIsEditMode(false);
    };

    const handleCancel = () => {

        setDigitals(model?.digitals || []);
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
                <h2 className="text-2xl font-bold  text-primary">Digitals</h2>
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
                            <Plus className="mr-2 h-4 w-4" /> Add Digital
                        </Button>
                        <Button type="button" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Digitals
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {/* Cards */}
            {digitals.length === 0 && !isEditMode ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No digitals added yet.</p>
                    <Button className="mt-4" variant="outline" onClick={() => setIsEditMode(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Digital
                    </Button>
                </div>
            ) : (
                <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-125 overflow-auto">
                    {digitals.map((digital, index) => (
                        <Card key={index} className="overflow-hidden">
                            {/* Image */}
                            {digital.src && (
                                <img
                                    src={digital.src}
                                    alt={digital.alt}
                                    className="h-48 w-full object-contain"
                                    onError={(e) =>
                                        ((e.target as HTMLImageElement).style.display = "none")
                                    }
                                />
                            )}

                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base">
                                    Digital #{index + 1}
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
                                    <Label>Image URL</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={digital.src}
                                            onChange={(e) => handleChange(index, "src", e.target.value)}
                                            placeholder="https://..."
                                        />
                                    ) : (
                                        <p className="text-sm break-all text-muted-foreground line-clamp-1">
                                            {digital.src || "Not set"}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Alt Text</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={digital.alt}
                                            onChange={(e) => handleChange(index, "alt", e.target.value)}
                                            placeholder="Image description"
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {digital.alt || "Not set"}
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

export default DigitalsManager;
