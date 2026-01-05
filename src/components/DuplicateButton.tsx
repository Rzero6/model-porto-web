import { useState } from "react";
import { duplicateModelWithUid } from "@/services/modelService";

export const DuplicateModelButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleDuplicate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await duplicateModelWithUid();
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <button
                onClick={handleDuplicate}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {loading ? "Duplicating..." : "Duplicate Model"}
            </button>
            {success && <p className="text-green-600">Model duplicated successfully!</p>}
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};
