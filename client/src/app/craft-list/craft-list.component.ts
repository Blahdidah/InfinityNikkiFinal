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

  // Function to remove a sketch from the list
  removeSketch(index: number) {
    this.craftingListService.removeSketch(index);
  }
}
