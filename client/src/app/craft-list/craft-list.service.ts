import { Material } from "../material.model";
import { __spreadArray } from "tslib";
import { Subject } from "rxjs";

export class CraftingListService {

    materialsChanged = new Subject<Material[]>();
    startedEditing = new Subject<number>();
    private materials: Material[] = [
        new Material('Ambird Feather', 'Animal Grooming', ['Florawish', 'Breezy Meadow', 'Stoneville', 'Wishing Woods', 'Memorial Mountains'], 1.0),
        new Material('Bustlefly', 'Bug Catching', ['Breezy Meadow'], 3.0),
    ];

    getMaterials() {
        return this.materials.slice();
    }

    addMaterial(material: Material) {
        this.materials.push(material);
        this.materialsChanged.next(this.materials.slice());
    }

    addMaterials(materials: Material[]) {
        this.materials.push(...materials);
        this.materialsChanged.next(this.materials.slice());
    }

    getMaterial(index: number) {
        return this.materials[index];
    }

    updateMaterial(index: number, newMaterial: Material) {
        this.materials[index] = newMaterial;
        this.materialsChanged.next(this.materials.slice());
    }

    deleteMaterial(index: number) {
        this.materials.splice(index, 1);
        this.materialsChanged.next(this.materials.slice());
    }

}