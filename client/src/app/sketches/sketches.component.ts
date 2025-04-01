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

    constructor(private sketchesService: SketchesService) { }

    ngOnInit() {
        this.sketches = this.sketchesService.getSketches();
    }

    onSketchSelected(sketch: Sketch) {
        this.selectedSketch = sketch; // Set the selected sketch
    }
}