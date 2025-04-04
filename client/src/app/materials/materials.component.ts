import { Component, OnInit } from '@angular/core';
import { MaterialService } from './materials.service';
import { Material } from '../material.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-materials',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
    materials: Material[] = [];

    constructor(private materialService: MaterialService) { }

    ngOnInit(): void {
        this.materialService.getMaterials().subscribe(
            (data) => {
                console.log('Fetched Materials:', data);
                this.materials = data;
            },
            (error) => {
                console.error('Error fetching materials:', error);
            }
        );
    }
}