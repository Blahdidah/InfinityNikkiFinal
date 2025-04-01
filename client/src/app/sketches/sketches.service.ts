import { Injectable } from "@angular/core";
import { Sketch } from "./sketches.model";

import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
    
export class SketchesService{
    private sketches: Sketch[] = [
        {
            name: 'Moonlight Gown',
            description: 'A flowing gown inspired by the gentle glow of the moon.',
            styles: ['Elegant', 'Cool'], 
            attributes: ['Shimmering', 'Ethereal', 'Graceful'],
            category: 'Clothing',
            type: 'dress',
            materials: ['Silk Fabric', 'Moonstone'],
            image_url: 'assets/images/moonlight_gown.jpg',
            obtained: 'Gacha Event',
            stars: 5,
            part_of_set: true,
            set_name: 'Lunar Elegance'
        },
        {
            name: 'Sunset Veil',
            description: 'A delicate veil infused with the warm colors of a sunset.',
            styles: ['Elegant', 'Sweet'],
            attributes: ['Flowing', 'Delicate', 'Lightweight'],
            category: 'Accessories',
            type: 'headwear',
            materials: ['Tulle Fabric', 'Golden Thread'],
            image_url: 'assets/images/sunset_veil.jpg',
            obtained: 'Crafting',
            stars: 4,
            part_of_set: true,
            set_name: 'Sunset Serenade'
        },
        {
            name: 'Rosy Kiss',
            description: 'A deep red lip color that brings a touch of romance.',
            styles: ['Sexy', 'Elegant'], 
            attributes: ['Bold', 'Matte Finish', 'Long-lasting'],
            category: 'Makeup',
            type: 'lips',
            materials: ['Red Pigment', 'Lip Gloss Base'],
            image_url: 'assets/images/rosy_kiss.jpg',
            obtained: 'Boutique Shop',
            stars: 3,
            part_of_set: false
        }
    ];
    sketchesChanged = new Subject<Sketch[]>();

   //constructor(private craftingListService: CraftingListService) { }
    // need to write a lot of different codes here. going to skip for a minute.
    getSketches() {
        return this.sketches.slice();
    }

    getSketch(): { name: string }[] {
        return this.sketches;
    }

    setSketches(sketches: Sketch[]) {
        this.sketches = sketches;
        this.sketchesChanged.next(this.sketches.slice())
    }

    //add to Craft List
    //Update Sketch
    // delete Sketch
    
}