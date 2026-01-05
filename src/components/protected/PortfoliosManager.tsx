import { useState, useEffect, useRef } from "react";
import { Loader2, Save, Edit, X, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { portfolioCategory, imageAspectRatio } from "@/data/optionsData";
import type { ModelInfo, Portfolio } from "@/types/ModelInfo";
import { Card } from "../ui/card";

interface PortfoliosManagerProps {
    model: ModelInfo | null;
    loading: boolean;
    saveData: (data: Omit<ModelInfo, "id" | "created_at">) => Promise<void>;
}

const PortfoliosManager = ({ model, loading: isLoading, saveData }: PortfoliosManagerProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [originalPortfolios, setOriginalPortfolios] = useState<Portfolio[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (model) {
            setPortfolios(model.portofolios || []);
            setOriginalPortfolios(model.portofolios || []);
        }
    }, [model]);

    const handleAdd = () => {
        setPortfolios([...portfolios, { src: "", alt: "", category: "", aspectRatio: "" }]);

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
        setPortfolios(portfolios.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: keyof Portfolio, value: string) => {
        const updated = [...portfolios];
        updated[index] = { ...updated[index], [field]: value };
        setPortfolios(updated);
    };

    const handleSave = async () => {
        if (!model) return;

        const updatedModel: Omit<ModelInfo, "id" | "created_at"> = {
            ...model,
            portofolios: portfolios,
        };

        await saveData(updatedModel);
        setOriginalPortfolios(portfolios);
        setIsEditMode(false);
    };

    const handleCancel = () => {
        // Count unsaved changes
        const unsavedCount = portfolios.filter(
            (p, i) => JSON.stringify(p) !== JSON.stringify(originalPortfolios[i])
        ).length;

        if (unsavedCount > 0) {
            const confirmCancel = globalThis.confirm(
                `You have ${unsavedCount} unsaved change(s). Are you sure you want to cancel?`
            );
            if (!confirmCancel) return;
        }

        setPortfolios(originalPortfolios);
        setIsEditMode(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Portfolios</h2>
                {!isEditMode && (
                    <Button onClick={() => setIsEditMode(true)} variant="outline">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                )}

                {isEditMode && (
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button onClick={handleAdd} variant="outline">
                            <Plus className="mr-2 h-4 w-4" /> Add Portfolio
                        </Button>
                        <Button type="button" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Portfolios
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {portfolios.length !== 0 && (
                <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-125 overflow-auto">
                    {portfolios.map((portfolio, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden"
                        >
                            {portfolio.src && (
                                <img
                                    src={portfolio.src}
                                    alt={portfolio.alt}
                                    className="w-full h-48 object-contain"
                                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                                />
                            )}

                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-semibold">Portfolio #{index + 1}</h3>
                                    {isEditMode && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemove(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="space-y-3 flex-1">
                                    <div className="space-y-1">
                                        <Label htmlFor={`portfolio-${index}-src`}>Image URL *</Label>
                                        {isEditMode ? (
                                            <Input
                                                id={`portfolio-${index}-src`}
                                                value={portfolio.src}
                                                onChange={(e) => handleChange(index, "src", e.target.value)}
                                                placeholder="https://..."
                                                required
                                            />
                                        ) : (
                                            <p className="text-sm text-muted-foreground truncate">{portfolio.src || "Not set"}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor={`portfolio-${index}-alt`}>Alt Text *</Label>
                                        {isEditMode ? (
                                            <Input
                                                id={`portfolio-${index}-alt`}
                                                value={portfolio.alt}
                                                onChange={(e) => handleChange(index, "alt", e.target.value)}
                                                placeholder="Description of the image"
                                                required
                                            />
                                        ) : (
                                            <p className="text-sm text-muted-foreground truncate">{portfolio.alt || "Not set"}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor={`portfolio-${index}-category`}>Category *</Label>
                                        {isEditMode ? (
                                            <Select
                                                value={portfolio.category}
                                                onValueChange={(value) => handleChange(index, "category", value)}
                                            >
                                                <SelectTrigger id={`portfolio-${index}-category`} className="w-full">
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {portfolioCategory.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">{portfolio.category || "Not set"}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor={`portfolio-${index}-aspectRatio`}>Aspect Ratio</Label>
                                        {isEditMode ? (
                                            <Select
                                                value={portfolio.aspectRatio || ""}
                                                onValueChange={(value) => handleChange(index, "aspectRatio", value)}
                                            >
                                                <SelectTrigger id={`portfolio-${index}-aspectRatio`} className="w-full">
                                                    <SelectValue placeholder="Select aspect ratio" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {imageAspectRatio.map((ratio) => (
                                                        <SelectItem key={ratio} value={ratio}>
                                                            {ratio.charAt(0).toUpperCase() + ratio.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">{portfolio.aspectRatio || "Not set"}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PortfoliosManager;
