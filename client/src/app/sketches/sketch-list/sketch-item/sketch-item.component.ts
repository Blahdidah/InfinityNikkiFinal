import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Sketch } from "../../sketches.model";
import { CraftingListService } from "src/app/craft-list/craft-list.service";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-sketch-item',
    templateUrl: './sketch-item.component.html',
    styleUrls: ['./sketch-item.component.css']
})
export class SketchItemComponent {
    @Input() sketch!: Sketch;
    @Input() index!: number;
    @Output() sketchAdded = new EventEmitter<void>();

    constructor(
        private craftingListService: CraftingListService,
        private http: HttpClient  // Inject HttpClient
    ) { }

    addToCraftingList(sketch: Sketch) {
        this.craftingListService.updateMaterials(sketch.materials);
        this.craftingListService.addToCraftingList(sketch);
        this.sketchAdded.emit(); // 🔔 Emit the event to parent

        // Optional: Save to backend
        this.http.post('http://localhost:3000/api/craft-list/add-to-craft-list', { sketchId: sketch._id })
            .subscribe(response => {
                console.log('Sketch added to craft list:', response);
            }, error => {
                console.error('Error adding sketch to craft list:', error);
            });
    }
}