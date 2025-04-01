import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Sketch } from '../sketches.model';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { SketchesService } from '../sketches.service';
@Component({
    selector: 'app-sketch-list',
    templateUrl: './sketch-list.component.html',
    styleUrls: ['./sketch-list.component.css']
})

export class SketchListComponent implements OnInit, OnDestroy{
    sketches: Sketch[] = [];
    subscription!: Subscription;

    @Output() sketchSelected = new EventEmitter<Sketch>(); 

    constructor(private router: Router,
        private route: ActivatedRoute,
        private sketchService: SketchesService) { }
    
    ngOnInit(): void {
        this.sketches = this.sketchService.getSketches();
        this.subscription = this.sketchService.sketchesChanged.subscribe(
            (sketches: Sketch[]) => {
                this.sketches = sketches;
            }
        )
    }
    onNewSketch() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    onSketchClick(sketch: Sketch) {
        this.sketchSelected.emit(sketch); 
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}