import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Sketch } from "./sketches.model";
import { Observable } from "rxjs";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
    
export class SketchesService{
    private apiUrl = 'http://localhost:3000/api/sketches';
    private sketches: Sketch[] = [];
    
    constructor( private http: HttpClient){}
    
    sketchesChanged = new Subject<Sketch[]>();

    getAllSketches(): Observable<Sketch[]> {
        return this.http.get<Sketch[]>(this.apiUrl);  // Fetch all sketches
    }

    getSketchById(id: string): Observable<Sketch> {
        return this.http.get<Sketch>(`${this.apiUrl}/${id}`);  // Fetch sketch by ID
    }

    setSketches(sketches: Sketch[]): void {
        this.sketches = sketches;
    }

    getSketches(): Sketch[] {
        return this.sketches;
    }

    addSketch(sketch: Sketch) {
        return this.http.post<Sketch>(this.apiUrl, sketch);
    }

}