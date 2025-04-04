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
        this.fetchSketches();
    }

    fetchSketches() {
        this.sketchesService.getAllSketches().subscribe((data) => {
            this.sketches = data;
        });
    }

    viewSketchDetails(id: string) {
        this.sketchesService.getSketchById(id).subscribe((data) => {
            this.selectedSketch = data;
        })
    }

    onSketchSelected(sketch: Sketch) {
        this.selectedSketch = sketch; // Set the selected sketch
    }
}