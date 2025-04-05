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

  constructor(private craftingListService: CraftingListService) { }

  ngOnInit(): void {
    // Fetch the crafting list and materials
    this.craftingList = this.craftingListService.getSketches();
    this.materials = this.craftingListService.getMaterials();

    // Subscribe to changes in materials
    this.cmChangeSub = this.craftingListService.materialsChanged.subscribe((materials) => {
      this.materials = materials;
    });
  }

  ngOnDestroy(): void {
    this.cmChangeSub.unsubscribe();
  }

  getGroupedMaterials() {
    const grouped: { type: string, materials: { material: Material, quantity: number }[] }[] = [];

    this.materials.forEach((materialItem) => {
      const existingGroup = grouped.find(group => group.type === materialItem.material.type);
      if (existingGroup) {
        existingGroup.materials.push(materialItem);
      } else {
        grouped.push({ type: materialItem.material.type, materials: [materialItem] });
      }
    });
    return grouped;
  }

  // Remove sketch from craft list
  onRemoveSketch(index: number) {
    const confirmRemove = confirm('Are you sure you want to remove this sketch from the crafting list?');
    if (confirmRemove) {
      this.craftingListService.removeSketch(index);
    }
  }
}