import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CraftingListService } from './craft-list.service';
import { Sketch } from '../sketches/sketches.model';
import { Material } from '../material.model';

@Component({
  selector: 'app-craft-list',
  templateUrl: './craft-list.component.html',
  styleUrls: ['./craft-list.component.css']
})
export class CraftListComponent implements OnInit, OnDestroy {
  craftingList: Sketch[] = [];
  materials: { material: Material, quantity: number }[] = [];
  private cmChangeSub!: Subscription;
  private sketchesSub!: Subscription;
  loading = true;

  constructor(private craftingListService: CraftingListService) { }

  ngOnInit(): void {
    this.craftingListService.fetchCraftListFromServer();
    this.craftingList = this.craftingListService.getSketches();

    // Fetch and set only relevant materials from the server
    this.craftingListService.fetchMaterials().subscribe(materials => {
      this.materials = materials;
      this.getGroupedMaterialsByType();
    });

    this.cmChangeSub = this.craftingListService.materialsChanged.subscribe((materials) => {
      this.materials = materials;
    });

    this.sketchesSub = this.craftingListService.sketchesChanged.subscribe((sketches) => {
      this.craftingList = sketches;
    });
  }

  ngOnDestroy(): void {
    this.cmChangeSub.unsubscribe();
    this.sketchesSub.unsubscribe();
  }

  getGroupedMaterialsByType() {
    const groupedMaterials: { type: string, materials: { material: Material, quantity: number }[] }[] = [];

    this.materials.forEach(materialItem => {
      const type = materialItem.material.type; // Access the 'type' property for grouping
      const existingGroup = groupedMaterials.find(group => group.type === type);

      if (existingGroup) {
        existingGroup.materials.push(materialItem);
      } else {
        groupedMaterials.push({
          type: type,
          materials: [materialItem]
        });
      }
    });

    return groupedMaterials;
  }

  // Remove sketch from craft list
  onRemoveSketch(index: number) {
    const confirmRemove = confirm('Are you sure you want to remove this sketch from the crafting list?');
    if (confirmRemove) {
      this.craftingListService.removeSketch(index);
    }
  }
}
