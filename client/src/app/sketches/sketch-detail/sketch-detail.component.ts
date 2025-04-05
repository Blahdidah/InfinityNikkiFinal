import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Sketch } from "../sketches.model";
import { SketchesService } from "../sketches.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: 'app-sketch-detail',
    templateUrl: './sketch-detail.component.html',
    styleUrls: ['./sketch-detail.component.css']
})
export class SketchDetailComponent implements OnInit{
    @Input() sketch!: Sketch
    id!: number;
    @Output() editClicked = new EventEmitter<Sketch>();
    editingSketch: Sketch | null = null;


    constructor(private sketchService: SketchesService,
        private route: ActivatedRoute,
        private router: Router) { }
    
    ngOnInit(): void {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                }
            )
    }


    startEditing(sketch: Sketch) {
        this.editingSketch = { ...sketch }; // shallow copy
    }

    editSketch() {
        this.editClicked.emit(this.sketch);
    }
}