import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getModel, updateModel } from "@/services/modelService";
import type { ModelInfo } from "@/types/ModelInfo";

export function useModel() {
    const [model, setModel] = useState<ModelInfo | null>();
    const [loading, setLoading] = useState(true);
    const cleaned = useRef(false);

    const loadAll = async () => {
        try {
            setLoading(true);
            const m = await getModel();
            setModel(m);
        } catch (err) {
            toast.error("Failed to load data");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const saveData = async (
        data: Omit<ModelInfo, "id" | "created_at">,
    ) => {
        try {
            await updateModel(data);
            toast.success("data updated");

            const m = await getModel();
            setModel(m);
        } catch {
            toast.error("Failed to save data");
        }
    }

    useEffect(() => {
        if (!cleaned.current) {
            console.log("Loading data");
            loadAll();
        }
        return () => {
            cleaned.current = true;
        }
    }, [])

    return {
        model,
        loading,
        saveData,
    }
}
