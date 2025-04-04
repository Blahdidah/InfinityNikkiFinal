import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Sketch } from "./sketches.model";
import { DataStorageService } from "../shared/data-storage.service";
import { SketchesService } from "./sketches.service";

@Injectable({ providedIn: 'root' })
export class SketchResolverService implements Resolve<Sketch[]> {
    constructor(private dataStorageService: DataStorageService,
        private sketchesService: SketchesService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sketch[]> {
        return this.sketchesService.getAllSketches().pipe(
            switchMap(sketches => {
                if (sketches.length === 0) {
                    return this.dataStorageService.fetchSketches(); // Returns observable from fetchSketches
                } else {
                    return of(sketches); // Return the sketches as an observable
                }
            }),
            catchError(error => {
                // Handle errors if needed, maybe log or return a default value
                console.error(error);
                return of([]); // Return an empty array in case of error
            })
        );
    }
}
