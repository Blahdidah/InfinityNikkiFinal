import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Material } from "../material.model";
import { Sketch } from "../sketches/sketches.model";
import { Subject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CraftingListService {
    materialsChanged = new Subject<{ material: Material, quantity: number }[]>();
    sketchesChanged = new Subject<Sketch[]>();
    startedEditing = new Subject<number>();
    private craftingList: Sketch[] = []; // List of added sketches
    private materialsMap: { [key: string]: { material: Material, quantity: number } } = {}; // Store materials
    private sketches: Sketch[] = []; // List of sketches
    private materials: { material: Material, quantity: number }[] = [];
    private fullMaterialList: Material[] = [];
    
    constructor(private http: HttpClient) { }
    
    fetchCraftListFromServer() {
        this.http.get<{ sketches: Sketch[] }>('/api/craft-list')
            .subscribe({
                next: (response) => {
                    this.craftingList = response.sketches;
                    this.recalculateMaterials();
                    this.sketchesChanged.next(this.craftingList.slice());
                },
                error: (err) => {
                    console.error('Failed to load crafting list:', err);
                }
            });
    }

    fetchMaterials(): Observable<{ material: Material, quantity: number }[]> {
        return this.http.get<Material[]>('/api/materials').pipe(
            map((materials: Material[]) => {
                this.fullMaterialList = materials;
                this.recalculateMaterials();  // <== make sure this runs here
                return this.getMaterials();
            })
        );
    }


    // Add a sketch to the crafting list
    addToCraftingList(sketch: Sketch) {
        this.craftingList.push(sketch);
        this.updateMaterials(sketch.materials); // Update materials when sketch is added
        this.sketchesChanged.next(this.craftingList.slice()); // Notify updates
    }

    // Get the list of consolidated materials
    getMaterials(): { material: Material, quantity: number }[] {
        return Object.values(this.materialsMap);
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
            const materialName = item.material; // Material name as a string
            const quantity = item.quantity;

            // Find the full Material object based on the material name
            const materialInfo = this.materials.find(matObj => matObj.material.name === materialName); // matObj.material refers to the Material object

            if (materialInfo) {
                // If the material is already in the materialsMap, update the quantity
                if (this.materialsMap[materialName]) {
                    this.materialsMap[materialName].quantity += quantity;
                } else {
                    // If it's a new material, add it to the materialsMap with the full Material object
                    this.materialsMap[materialName] = {
                        material: materialInfo.material, // Use the full Material object
                        quantity: quantity
                    };
                }
            } else {
                console.error(`Material not found: ${materialName}`);
            }
        });

        // Emit updated materials to subscribers
        this.materialsChanged.next(Object.values(this.materialsMap));
    }


    // Recalculate the materials list when sketches are added or removed
    private recalculateMaterials() {
        this.materialsMap = {};
        this.craftingList.forEach(sketch => {
            sketch.materials.forEach(item => {
                const materialName = item.material;
                const materialInfo = this.fullMaterialList.find(mat => mat.name === materialName);

                if (materialInfo) {
                    if (this.materialsMap[materialName]) {
                        this.materialsMap[materialName].quantity += item.quantity;
                    } else {
                        this.materialsMap[materialName] = {
                            material: materialInfo,
                            quantity: item.quantity
                        };
                    }
                } else {
                    console.warn(`Material "${materialName}" not found in fullMaterialList`);
                }
            });
        });

        this.materialsChanged.next(this.getMaterials());
    }



    // Group materials by type (how they are obtained)
    groupMaterialsByType() {
        const groupedByType: { [key: string]: { material: Material; quantity: number }[] } = {};

        // Loop through each material in the materials map and group by type
        Object.values(this.materialsMap).forEach(materialEntry => {
            const materialType = materialEntry.material.type; // Access type of material (how it's obtained)

            if (!groupedByType[materialType]) {
                groupedByType[materialType] = [];
            }

            groupedByType[materialType].push(materialEntry);
        });

        return groupedByType;
    }

}
