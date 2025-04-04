import { Component, OnInit } from '@angular/core';
import { MaterialsService } from './materials.service';
import { Material } from '../material.model';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
    materials: Material[] = [];

    constructor(private materialsService: MaterialsService) { }

    ngOnInit(): void {
        this.materialsService.getMaterials().subscribe((data) => {
            this.materials = data;
        });
    }
}
