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
    @Output() editClicked = new EventEmitter<Sketch>();
    @Output() sketchDeleted = new EventEmitter<Sketch>();
    id!: number;
    editingSketch: Sketch | null = null;
    isDeleting: boolean = false;
    successMessage: string | null = null;


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

    onSketchAdded() {
        this.successMessage = `${this.sketch.name} added to your crafting list!`;

        // Clear message after a few seconds
        setTimeout(() => {
            this.successMessage = null;
        }, 3000);
    }

    startEditing(sketch: Sketch) {
        this.editingSketch = { ...sketch }; // shallow copy
    }

    editSketch() {
        this.editClicked.emit(this.sketch);
    }

    confirmDelete() {
        this.isDeleting = true;  // Show the confirmation dialog
    }

    cancelDelete() {
        this.isDeleting = false;  // Hide the confirmation dialog if the user cancels
    }

    deleteSketch() {
        if (this.sketch && this.sketch._id) {
            this.sketchService.deleteSketch(this.sketch._id).subscribe(() => {
                this.sketchDeleted.emit(this.sketch);  // Emit event to parent to remove the sketch from the list
                this.isDeleting = false;  // Hide the confirmation dialog
            });
        }
    }
}