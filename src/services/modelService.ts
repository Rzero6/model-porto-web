import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { type ModelInfo } from "@/types/ModelInfo"

const COLLECTION = "models";
const id = import.meta.env.VITE_FIREBASE_DATA;

export async function getModel(): Promise<ModelInfo | null> {
    const ref = doc(db, COLLECTION, id)
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    return {
        id: snap.id,
        ...(snap.data() as ModelInfo),
    }
}
export async function updateModel(
    data: Partial<ModelInfo>
) {
    const ref = doc(db, COLLECTION, id)

    await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
    })
}

export async function duplicateModelWithUid(): Promise<void> {
    if (!auth.currentUser) throw new Error("User not authenticated");

    const uid = auth.currentUser.uid;
    const originalRef = doc(db, "models", import.meta.env.VITE_FIREBASE_DATA);
    const originalSnap = await getDoc(originalRef);

    if (!originalSnap.exists()) throw new Error("Original model not found");

    const data = originalSnap.data() as ModelInfo;

    const newRef = doc(db, "models", uid); // use UID as document id
    await setDoc(newRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}
