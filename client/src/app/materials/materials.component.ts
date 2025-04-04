import { Component, OnInit } from '@angular/core';
import { MaterialsService } from './materials.service';

@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
    materials: any[] = [];

    constructor(private materialsService: MaterialsService) { }

    ngOnInit(): void {
        this.materialsService.getMaterials().subscribe((data) => {
            this.materials = data;
        });
    }
}
