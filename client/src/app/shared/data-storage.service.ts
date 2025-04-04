import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SketchesService } from "../sketches/sketches.service";
import { map, tap } from "rxjs";

//import { Recipe } from "../recipes/recipe.model";
import { Sketch } from "../sketches/sketches.model";
@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private sketchService: SketchesService
    ) { }

    storeSketches() {
        const sketches = this.sketchService.getAllSketches();
        this.http.put('NEEDSURL', sketches).subscribe(response => {
            console.log(response);
        });

    }
    fetchSketches() {
        return this.http.get<Sketch[]>('NEEDSURL')
            .pipe(map(sketches => {
                return sketches.map(sketch => {
                    return {
                        ...sketch, materials: sketch.materials ? sketch.materials : []
                    };
                });
            }),
                tap(sketches => {
                    this.sketchService.setSketches(sketches);
                })
            )

    }
}