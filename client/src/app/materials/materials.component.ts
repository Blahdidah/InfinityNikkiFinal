import { Component, OnInit } from '@angular/core';
import { Material } from '../material.model';
import { MaterialService } from './materials.service';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
    materials: Material[] = [];
    editableMaterial: Material = new Material('', '', [], 1, '');
    sourceInput: string = '';
    isEditing: boolean = false;
    editingIndex: number | null = null;
    editingId: string | null = null;

    constructor(private materialService: MaterialService) { }

    ngOnInit() {
        this.loadMaterials();
    }

    loadMaterials() {
        this.materialService.getMaterials().subscribe((data) => {
            this.materials = data;
        });
    }

    onSubmit() {
        this.editableMaterial.source = this.sourceInput.split(',').map(s => s.trim());

        if (this.isEditing && this.editingId) {
            this.materialService.updateMaterial(this.editingId, this.editableMaterial)
                .subscribe(() => this.loadMaterials());
        } else {
            this.materialService.addMaterial(this.editableMaterial)
                .subscribe(() => this.loadMaterials());
        }

        this.resetForm();
    }

    onEditMaterial(index: number) {
        this.isEditing = true;
        const material = this.materials[index];
        this.editingIndex = index;
        this.editingId = (material as any)._id; // assuming MongoDB `_id`
        this.editableMaterial = { ...material };
        this.sourceInput = material.source.join(', ');
    }

    onCancelEdit() {
        this.resetForm();
    }

    private resetForm() {
        this.editableMaterial = new Material('', '', [], 1, '');
        this.sourceInput = '';
        this.isEditing = false;
        this.editingIndex = null;
        this.editingId = null;
    }
}
