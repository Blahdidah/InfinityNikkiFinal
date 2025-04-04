import { Injectable } from "@angular/core";
import { Material } from "../material.model";
import { Sketch } from "../sketches/sketches.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CraftingListService {
    materialsChanged = new Subject<{ material: Material, quantity: number }[]>();
    sketchesChanged = new Subject<Sketch[]>();
    startedEditing = new Subject<number>();
    private craftingList: Sketch[] = []; // List of added sketches
    private materialsMap: { [key: string]: { material: Material, quantity: number } } = {}; // Store materials
    private sketches: Sketch[] = []; // List of sketches
    private materials: { material: Material, quantity: number }[] = [];
    

    // Add a sketch to the crafting list
    addToCraftingList(sketch: Sketch) {
        this.craftingList.push(sketch);
        this.updateMaterials(sketch.materials); // Update materials when sketch is added
        this.sketchesChanged.next(this.craftingList.slice()); // Notify updates
    }

    // Get the list of consolidated materials
    getMaterials() {
        return Object.values(this.materialsMap); // Return the consolidated materials
    }

    // Get the sketches in the crafting list
    getSketches() {
        return this.craftingList.slice();
    }

    // Add a sketch to the sketches list
    addSketch(sketch: Sketch) {
        this.sketches.push(sketch);
        this.updateMaterials(sketch.materials); // Update materials
        this.sketchesChanged.next(this.sketches.slice()); // Notify change
    }

    // Remove a sketch from the crafting list by index
    removeSketch(index: number) {
        const removedSketch = this.craftingList[index];
        this.craftingList.splice(index, 1); // Remove the sketch

        // Recalculate materials after removing a sketch
        this.recalculateMaterials();

        // Notify the subscribers about the update
        this.sketchesChanged.next(this.craftingList.slice());
    }

    // Update the materials list based on a sketch's materials
    updateMaterials(materials: { material: string, quantity: number }[]) {
        materials.forEach((item) => {
            const materialName = item.material;
            const quantity = item.quantity;

            if (this.materialsMap[materialName]) {
                // If material exists, increase quantity
                this.materialsMap[materialName].quantity += quantity;
            } else {
                // If material doesn't exist, add it
                this.materialsMap[materialName] = {
                    material: {
                        name: materialName,
                        sourceType: 'default',  // You can adjust these default values as needed
                        sources: [],
                        rarity: 1
                    },
                    quantity: quantity
                };
            }
        });

        // Emit updated materials to subscribers
        this.materialsChanged.next(Object.values(this.materialsMap));
    }


    // Recalculate the materials list when sketches are added or removed
    private recalculateMaterials() {
        this.materialsMap = {};  // Clear existing map

        this.sketches.forEach(sketch => {
            this.updateMaterials(sketch.materials); // Re-add materials
        });

        this.materialsChanged.next(Object.values(this.materialsMap));
    }
}
