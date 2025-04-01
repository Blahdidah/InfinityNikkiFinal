import { Component, Input } from "@angular/core";
import { Sketch } from "../../sketches.model";

@Component({
    selector: 'app-sketch-item',
    templateUrl: './sketch-item.component.html',
    styleUrls: ['./sketch-item.component.css']
})

export class SketchItemComponent{
    @Input() sketch!: Sketch;
    @Input() index!: number;

}