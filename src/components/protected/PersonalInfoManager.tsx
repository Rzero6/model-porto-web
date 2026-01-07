import { useState, useEffect } from "react";
import { Loader2, Save, Edit, X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import LanguagesInput from "./LanguagesInput";
import type { ModelInfo } from "@/types/ModelInfo";

interface PersonalInfoManagerProps {
    model: ModelInfo | null;
    loading: boolean;
    saveData: (data: Omit<ModelInfo, "id" | "created_at">) => Promise<void>;
}

const PersonalInfoManager = ({ model, loading: isLoading, saveData }: PersonalInfoManagerProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState<Omit<ModelInfo, "id" | "created_at">>({
        name: "",
        email: "",
        tagline: "",
        biography: "",
        location: "",
        heroImage: "",
        profileImage: "",
        instagram: "",
        tiktok: "",
        whatsapp: "",
        details: {
            height: 0,
            weight: 0,
            bust: 0,
            waist: 0,
            hips: 0,
            shoes: 0,
            hair: "",
            ethnicity: "",
            languages: [],
        },
        digitals: [],
        portofolios: [],
        clients: [],
        achievements: [],
    });

    // Populate form when model data loads
    useEffect(() => {
        if (model) {
            setFormData({
                name: model.name || "",
                email: model.email || "",
                tagline: model.tagline || "",
                biography: model.biography || "",
                location: model.location || "",
                heroImage: model.heroImage || "",
                profileImage: model.profileImage || "",
                instagram: model.instagram || "",
                tiktok: model.tiktok || "",
                whatsapp: model.whatsapp || "",
                details: {
                    height: model.details?.height || 0,
                    weight: model.details?.weight || 0,
                    bust: model.details?.bust || 0,
                    waist: model.details?.waist || 0,
                    hips: model.details?.hips || 0,
                    shoes: model.details?.shoes || 0,
                    hair: model.details?.hair || "",
                    ethnicity: model.details?.ethnicity || "",
                    languages: model.details?.languages || [],
                },
                digitals: model.digitals || [],
                portofolios: model.portofolios || [],
                clients: model.clients || [],
                achievements: model.achievements || [],
            });
        }
    }, [model]);

    const handleInputChange = (field: string, value: string | number) => {
        if (field.startsWith("details.")) {
            const detailField = field.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                details: {
                    ...prev.details,
                    [detailField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleLanguagesChange = (languages: string[]) => {
        setFormData((prev) => ({
            ...prev,
            details: {
                ...prev.details,
                languages,
            },
        }));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await saveData(formData);
        setIsEditMode(false);
    };

    const handleCancel = () => {
        // Reset form to model data
        if (model) {
            setFormData({
                name: model.name || "",
                email: model.email || "",
                tagline: model.tagline || "",
                biography: model.biography || "",
                location: model.location || "",
                heroImage: model.heroImage || "",
                profileImage: model.profileImage || "",
                instagram: model.instagram || "",
                tiktok: model.tiktok || "",
                whatsapp: model.whatsapp || "",
                details: {
                    height: model.details?.height || 0,
                    weight: model.details?.weight || 0,
                    bust: model.details?.bust || 0,
                    waist: model.details?.waist || 0,
                    hips: model.details?.hips || 0,
                    shoes: model.details?.shoes || 0,
                    hair: model.details?.hair || "",
                    ethnicity: model.details?.ethnicity || "",
                    languages: model.details?.languages || [],
                },
                digitals: model.digitals || [],
                portofolios: model.portofolios || [],
                clients: model.clients || [],
                achievements: model.achievements || [],
            });
        }
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
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Personal Information</h2>
                {!isEditMode && (
                    <Button onClick={() => setIsEditMode(true)} variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                )}
                {/* Submit Button */}
                {isEditMode && (
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Model
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <form onSubmit={onFormSubmit} className="space-y-8">
                {/* Basic Info Section */}
                <div className="admin-section">
                    <h2 className="admin-header mb-4">Basic Information</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            {isEditMode ? (
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="Model name"
                                    required
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.name || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            {isEditMode ? (
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="email@example.com"
                                    required
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.email || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline *</Label>
                            {isEditMode ? (
                                <Input
                                    id="tagline"
                                    value={formData.tagline}
                                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                                    placeholder="Professional tagline"
                                    required
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.tagline || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            {isEditMode ? (
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => handleInputChange("location", e.target.value)}
                                    placeholder="City, Country"
                                    required
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.location || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="biography">Biography *</Label>
                            {isEditMode ? (
                                <Textarea
                                    id="biography"
                                    value={formData.biography}
                                    onChange={(e) => handleInputChange("biography", e.target.value)}
                                    placeholder="Write a short biography..."
                                    rows={4}
                                    required
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[96px] border rounded-md bg-muted/50 whitespace-pre-wrap">
                                    {formData.biography || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Images Section */}
                <div className="admin-section">
                    <h2 className="admin-header mb-4">Images</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="heroImage">Hero Image URL (1920:1080)</Label>
                            {isEditMode ? (
                                <>
                                    <Input
                                        id="heroImage"
                                        value={formData.heroImage}
                                        onChange={(e) => handleInputChange("heroImage", e.target.value)}
                                        placeholder="https://..."
                                        className="truncate"
                                        title={formData.heroImage}
                                    />
                                    {formData.heroImage && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.heroImage}
                                                alt="Hero preview"
                                                className="w-full h-auto max-h-48 object-contain rounded-md border"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                        {formData.heroImage ? (
                                            <a
                                                href={formData.heroImage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline truncate block"
                                                title={formData.heroImage}
                                            >
                                                {formData.heroImage}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">Not set</span>
                                        )}
                                    </div>
                                    {formData.heroImage && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.heroImage}
                                                alt="Hero preview"
                                                className="w-full h-auto max-h-48 object-contain rounded-md border"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="profileImage">Profile Image URL (3:4)</Label>
                            {isEditMode ? (
                                <>
                                    <Input
                                        id="profileImage"
                                        value={formData.profileImage}
                                        onChange={(e) => handleInputChange("profileImage", e.target.value)}
                                        placeholder="https://..."
                                        className="truncate"
                                        title={formData.profileImage}
                                    />
                                    {formData.profileImage && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.profileImage}
                                                alt="Profile preview"
                                                className="w-full h-auto max-h-48 object-contain rounded-md border"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                        {formData.profileImage ? (
                                            <a
                                                href={formData.profileImage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline truncate block"
                                                title={formData.profileImage}
                                            >
                                                {formData.profileImage}
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">Not set</span>
                                        )}
                                    </div>
                                    {formData.profileImage && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.profileImage}
                                                alt="Profile preview"
                                                className="w-full h-auto max-h-48 object-contain rounded-md border"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="admin-section">
                    <h2 className="admin-header mb-4">Social Links</h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            {isEditMode ? (
                                <Input
                                    id="instagram"
                                    value={formData.instagram}
                                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                                    placeholder="@username"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.instagram || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok</Label>
                            {isEditMode ? (
                                <Input
                                    id="tiktok"
                                    value={formData.tiktok}
                                    onChange={(e) => handleInputChange("tiktok", e.target.value)}
                                    placeholder="@username"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.tiktok || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            {isEditMode ? (
                                <Input
                                    id="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                                    placeholder="+6281234567..."
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.whatsapp || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="admin-section">
                    <h2 className="admin-header mb-4">Physical Details</h2>
                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        <div className="space-y-2">
                            <Label htmlFor="details.height">Height (cm)</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.height"
                                    type="number"
                                    value={formData.details.height || ""}
                                    onChange={(e) => handleInputChange("details.height", e.target.value ? Number(e.target.value) : 0)}
                                    placeholder="175"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.height || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.weight">Weight (kg)</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.weight"
                                    type="number"
                                    value={formData.details.weight || ""}
                                    onChange={(e) => handleInputChange("details.weight", e.target.value ? Number(e.target.value) : 0)}
                                    placeholder="50"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.weight || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.bust">Bust (cm)</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.bust"
                                    type="number"
                                    value={formData.details.bust || ""}
                                    onChange={(e) => handleInputChange("details.bust", e.target.value ? Number(e.target.value) : 0)}
                                    placeholder="85"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.bust || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.waist">Waist (cm)</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.waist"
                                    type="number"
                                    value={formData.details.waist || ""}
                                    onChange={(e) => handleInputChange("details.waist", e.target.value ? Number(e.target.value) : 0)}
                                    placeholder="60"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.waist || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.hips">Hips (cm)</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.hips"
                                    type="number"
                                    value={formData.details.hips || ""}
                                    onChange={(e) => handleInputChange("details.hips", e.target.value ? Number(e.target.value) : 0)}
                                    placeholder="90"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.hips || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.shoes">Shoes (EU)</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.shoes"
                                    type="number"
                                    value={formData.details.shoes || ""}
                                    onChange={(e) => handleInputChange("details.shoes", e.target.value ? Number(e.target.value) : 0)}
                                    placeholder="39"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.shoes || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.hair">Hair Color</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.hair"
                                    value={formData.details.hair}
                                    onChange={(e) => handleInputChange("details.hair", e.target.value)}
                                    placeholder="Brown"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.hair || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details.ethnicity">Ethnicity</Label>
                            {isEditMode ? (
                                <Input
                                    id="details.ethnicity"
                                    value={formData.details.ethnicity}
                                    onChange={(e) => handleInputChange("details.ethnicity", e.target.value)}
                                    placeholder="Mixed"
                                />
                            ) : (
                                <div className="px-3 py-2 min-h-[36px] border rounded-md bg-muted/50">
                                    {formData.details.ethnicity || <span className="text-muted-foreground">Not set</span>}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label className="text-sm mb-2 block">Languages</Label>
                        <LanguagesInput
                            languages={formData.details.languages}
                            onChange={handleLanguagesChange}
                            disabled={!isEditMode}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PersonalInfoManager;