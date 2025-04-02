import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Material } from '../material.model'
import { CraftingListService } from './craft-list.service';

@Component({
  selector: 'app-craft-list',
  templateUrl: './craft-list.component.html',
  styleUrls: ['./craft-list.component.css']
})
export class CraftListComponent implements OnInit, OnDestroy{

  material!: Material[];
  private cmChangeSub!: Subscription;

  constructor(private clService: CraftingListService) {
  }

  ngOnInit(): void {
    this.material = this.clService.getMaterials().map(m => m.material);
    this.clService.materialsChanged.subscribe((materials) => {
      this.material = materials.map(m => m.material);
  });
    this.cmChangeSub = this.clService.materialsChanged
      .subscribe(
        (materials: Material[]) => {
          this.material = materials;
        }
      );
  }
  onEditItem(index: number) {
    this.clService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.cmChangeSub.unsubscribe();
  }
}
