import { Material } from "../material.model";

export interface Sketch {
    name: string;
    description: string;
    styles: ("Elegant" | "Fresh" | "Sweet" | "Sexy" | "Cool")[];
    attributes: string[];
    category: 'Clothing' | 'Accessories' | 'Makeup';
    type:
    | 'hair' | 'dress' | 'outerwear' | 'tops' | 'bottoms' | 'socks' | 'shoes'
    | 'hair accessories' | 'headwear' | 'earrings' | 'neckwear' | 'bracelets'
    | 'chokers' | 'gloves' | 'face decorations' | 'chest accessories' | 'pendants'
    | 'backpieces' | 'rings' | 'arm decoration' | 'hand helds'
    | 'base makeup' | 'eyebrows' | 'eyelashes' | 'contact lenses'
    | 'lips' | 'skintones' | 'full makeup';
    materials: string[];
    image_url: string;
    obtained: string;
    stars: 1 | 2 | 3 | 4 | 5;
    part_of_set: boolean;
    set_name?: string;
}
