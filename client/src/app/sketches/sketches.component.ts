import { Component, OnInit } from "@angular/core";
import { SketchesService } from "./sketches.service";
import { Sketch } from "./sketches.model";

@Component({
    selector: 'app-sketches',
    templateUrl: './sketches.component.html',
    styleUrls: ['./sketches.component.css']
})
export class SketchesComponent implements OnInit {
    sketches: Sketch[] = [];
    selectedSketch: Sketch | null = null;

    newSketch: Sketch = {
        name: '',
        description: '',
        styles: [],
        attributes: [],
        category: 'Clothing', // Valid default value
        type: '',
        materials: [],
        image_url: '',
        obtained: '',
        stars: 1,
        part_of_set: false
    };

    attributeInput = '';
    materials = [{ material: '', quantity: 1 }];

    constructor(private sketchesService: SketchesService) { }

    ngOnInit() {
        this.fetchSketches();
    }

    fetchSketches() {
        this.sketchesService.getAllSketches().subscribe((data) => {
            this.sketches = data;
        });
    }

    viewSketchDetails(id: string) {
        this.sketchesService.getSketchById(id).subscribe((data) => {
            this.selectedSketch = data;
        });
    }

    onSketchSelected(sketch: Sketch) {
        this.selectedSketch = sketch;
    }

    toggleStyle(style: 'Elegant' | 'Fresh' | 'Sweet' | 'Sexy' | 'Cool', event: any) {
        if (event.target.checked) {
            if (!this.newSketch.styles.includes(style)) {
                this.newSketch.styles.push(style);
            }
        } else {
            this.newSketch.styles = this.newSketch.styles.filter(s => s !== style);
        }
    }

    addMaterial() {
        this.materials.push({ material: '', quantity: 1 });
    }

    removeMaterial(index: number) {
        this.materials.splice(index, 1);
    }

    onAddSketch() {
        if (this.attributeInput) {
            this.newSketch.attributes = this.attributeInput.split(',').map(attr => attr.trim());
        }

        this.newSketch.materials = this.materials
            .filter(mat => mat.material.trim() !== '')
            .map(mat => ({
                material: mat.material.trim(),
                quantity: mat.quantity
            }));

        this.sketchesService.addSketch(this.newSketch).subscribe(() => {
            this.fetchSketches(); // Refresh list
            this.resetForm();
        });
    }

    resetForm() {
        this.newSketch = {
            name: '',
            description: '',
            styles: [],
            attributes: [],
            category: 'Clothing',
            type: '',
            materials: [],
            image_url: '',
            obtained: '',
            stars: 1,
            part_of_set: false
        };
        this.materials = [{ material: '', quantity: 1 }];
        this.attributeInput = '';
    }
    
}
