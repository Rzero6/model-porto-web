import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface LanguagesInputProps {
    languages: string[];
    onChange: (languages: string[]) => void;
    disabled?: boolean;
}

const LanguagesInput = ({ languages, onChange, disabled }: LanguagesInputProps) => {
    const [newLanguage, setNewLanguage] = useState("");

    const addLanguage = () => {
        if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
            onChange([...languages, newLanguage.trim()]);
            setNewLanguage("");
        }
    };

    const removeLanguage = (index: number) => {
        onChange(languages.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addLanguage();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a language"
                    disabled={disabled}
                />
                <Button
                    type="button"
                    onClick={addLanguage}
                    disabled={disabled || !newLanguage.trim()}
                    size="sm"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            {languages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {languages.map((lang, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-md text-sm"
                        >
                            <span>{lang}</span>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => removeLanguage(index)}
                                    className="ml-1 hover:text-destructive"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguagesInput;

