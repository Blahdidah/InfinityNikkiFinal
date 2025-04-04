import { Component, Input } from "@angular/core";
import { Sketch } from "../../sketches.model";
import { CraftingListService } from "src/app/craft-list/craft-list.service";

@Component({
    selector: 'app-sketch-item',
    templateUrl: './sketch-item.component.html',
    styleUrls: ['./sketch-item.component.css']
})
export class SketchItemComponent {
    @Input() sketch!: Sketch;
    @Input() index!: number;

    constructor(private craftingListService: CraftingListService) { }

    addToCraftingList(sketch: Sketch) {
        // Call the service method to update materials with proper structure
        this.craftingListService.updateMaterials(sketch.materials);
        this.craftingListService.addToCraftingList(sketch);

    }

}
