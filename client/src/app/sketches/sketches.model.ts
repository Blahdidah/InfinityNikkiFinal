import { Material } from "../material.model";

export interface Sketch {
    _id?: string;
    name: string;
    description: string;
    styles: ("Elegant" | "Fresh" | "Sweet" | "Sexy" | "Cool")[];
    attributes: string[];
    category: 'Clothing' | 'Accessories' | 'Makeup';
    type: string;
    materials: { material: string; quantity: number }[];
    image_url: string;
    obtained: string;
    stars: 1 | 2 | 3 | 4 | 5;
    part_of_set: boolean;
    set_name?: string;
}
