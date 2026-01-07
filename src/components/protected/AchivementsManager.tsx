import { useState, useEffect, useRef } from "react";
import { Loader2, Save, Edit, X, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ModelInfo, Achievement } from "@/types/ModelInfo";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";
import { Timestamp } from "firebase/firestore";

interface AchivementsManagerProps {
    model: ModelInfo | null;
    loading: boolean;
    saveData: (data: Omit<ModelInfo, "id" | "created_at">) => Promise<void>;
}

const AchivementsManager = ({ model, loading: isLoading, saveData }: AchivementsManagerProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (model) {
            const achievementsWithDates = (model.achievements || []).map(a => ({
                ...a,
                date: a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date)
            }));
            setAchievements(achievementsWithDates);
        }
    }, [model]);


    const handleAdd = () => {
        setAchievements(prev => [...prev, { title: "", description: "", imageUrl: "", date: new Date() }]);
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
        setAchievements(achievements.filter((_, i) => i !== index));
    }

    const handleChange = (index: number, field: keyof Achievement, value: string | Date) => {
        const updated = [...achievements];
        updated[index] = { ...updated[index], [field]: value };
        setAchievements(updated);
    };

    const handleSave = async () => {
        if (!model) return;
        await saveData({ ...model, achievements });
        setIsEditMode(false);
    };

    const handleCancel = () => {
        const achievementsWithDates = (model?.achievements || []).map(a => ({
            ...a,
            date: a.date instanceof Timestamp ? a.date.toDate() : new Date(a.date)
        }));
        setAchievements(achievementsWithDates || []);
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
                <h2 className="text-2xl font-bold text-primary">Achievements</h2>
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
                            <Plus className="mr-2 h-4 w-4" /> Add Achievement
                        </Button>
                        <Button type="button" onClick={handleSave} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Achievements
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {/* Cards */}
            {achievements.length === 0 && !isEditMode ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No achievements added yet.</p>
                    <Button className="mt-4" variant="outline" onClick={() => setIsEditMode(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Achievement
                    </Button>
                </div>
            ) : (
                <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-125 overflow-auto">
                    {achievements.map((achievement, index) => (
                        <Card key={index} className="overflow-hidden">
                            {/* Image URL */}
                            {achievement.imageUrl && (
                                <img
                                    src={achievement.imageUrl}
                                    alt={achievement.title}
                                    className="h-48 w-full object-contain"
                                    onError={(e) =>
                                        ((e.target as HTMLImageElement).style.display = "none")
                                    }
                                />
                            )}

                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-base">
                                    Achievement #{index + 1}
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
                                    <Label>Title</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={achievement.title}
                                            onChange={(e) => handleChange(index, "title", e.target.value)}
                                            placeholder="Achievement Title"
                                            required
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {achievement.title || "Not set"}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Achievement Description</Label>
                                    {isEditMode ? (
                                        <Textarea
                                            value={achievement.description || ""}
                                            onChange={(e) => handleChange(index, "description", e.target.value)}
                                            placeholder="Description..."
                                            rows={3}
                                            required
                                        />
                                    ) : (
                                        <p className="text-sm break-all text-muted-foreground line-clamp-3">
                                            {achievement.description || "Not set"}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Image URL</Label>
                                    {isEditMode ? (
                                        <Input
                                            value={achievement.imageUrl || ""}
                                            onChange={(e) => handleChange(index, "imageUrl", e.target.value)}
                                            placeholder="https://..."
                                            required
                                        />
                                    ) : (
                                        <p className="text-sm break-all text-muted-foreground line-clamp-1">
                                            {achievement.imageUrl || "Not set"}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {isEditMode ? (
                                        <DatePicker
                                            value={achievement.date ?? undefined}
                                            onChange={(value) => handleChange(index, "date", value)}
                                            buttonClassName="w-full bg-card text-card-foreground"
                                            className="bg-card text-card-foreground"
                                            required
                                        />
                                    ) : (
                                        <>
                                            <Label htmlFor="date">Date</Label>
                                            <p className="text-sm break-all text-muted-foreground">
                                                {achievement.date.toLocaleDateString() || "Not set"}
                                            </p>
                                        </>
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

export default AchivementsManager;
