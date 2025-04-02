import { Injectable } from "@angular/core";
import { Material } from "../material.model";
import { Sketch } from "../sketches/sketches.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CraftingListService {
    materialsChanged = new Subject<{ material: Material, quantity: number }[]>();
    sketchesChanged = new Subject<Sketch[]>();
    startedEditing = new Subject<number>();

    private sketches: Sketch[] = [];
    private materials: { material: Material, quantity: number }[] = [];

    getMaterials() {
        return this.materials.slice();
    }

    getSketches() {
        return this.sketches.slice();
    }

    addSketch(sketch: Sketch) {
        this.sketches.push(sketch);
        this.updateMaterials(sketch.materials);
        this.sketchesChanged.next(this.sketches.slice());
    }

    removeSketch(index: number) {
        const removedSketch = this.sketches[index];

        // Remove sketch from the list
        this.sketches.splice(index, 1);
        this.sketchesChanged.next(this.sketches.slice());

        // Recalculate material quantities after removing a sketch
        this.recalculateMaterials();
    }

    updateMaterials(materials: { material: string; quantity: number }[]) {
      const updatedMaterials: { material: Material; quantity: number }[] = materials.map(m => ({
          material: new Material(m.material, '', [], 0), // Convert string to Material object
          quantity: m.quantity
      }));
  
      this.materials.push(...updatedMaterials);
      this.materialsChanged.next(this.materials.slice());
  }
  

    private recalculateMaterials() {
        this.materials = [];

        // Rebuild the materials list based on the current sketches
        this.sketches.forEach(sketch => {
            this.updateMaterials(sketch.materials);
        });

        this.materialsChanged.next(this.materials.slice());
    }

}
