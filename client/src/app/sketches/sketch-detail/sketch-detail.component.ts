import { Component, OnInit, Input } from "@angular/core";
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

    constructor(private sketchService: SketchesService,
        private route: ActivatedRoute,
        private router: Router) { }
    
    ngOnInit(): void {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    //this.sketch = this.sketchService.getSketch(this.id);
                }
            )
    }

    //add to crafting list
    //edit sketch
    //ondelete sketch
}