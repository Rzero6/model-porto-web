export interface ModelInfo {
    id?: string;
    name: string;
    heroImage: string;
    profileImage: string;
    tagline: string;
    biography: string;
    location: string;
    email: string;
    instagram?: string;
    tiktok?: string;
    whatsapp?: string;
    details: DetailsInfo;
    digitals: Digital[];
    portofolios: Portfolio[];
    clients: Client[];
}
export interface DetailsInfo {
    height: number;
    weight: number;
    bust: number;
    waist: number;
    hips: number;
    shoes: number;
    hair: string;
    ethnicity: string;
    languages: string[];
}
export interface Digital {
    id?: string;
    src: string;
    alt: string;
}
export interface Portfolio extends Digital {
    category: string;
    aspectRatio?: string;
}
export interface Client {
    id?: string;
    name: string;
    url?: string;
    logo?: string;
}

export interface SectionProps {
    model: ModelInfo;
}