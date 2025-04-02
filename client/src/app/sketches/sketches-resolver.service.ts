import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterState, RouterStateSnapshot } from "@angular/router";


import { Sketch } from "./sketches.model";
import { DataStorageService } from "../shared/data-storage.service";
import { SketchesService } from "./sketches.service";


@Injectable({ providedIn: 'root' })
export class SketchResolverService implements Resolve<Sketch[]> {
    constructor(private dataStorageService: DataStorageService,
        private sketchesService: SketchesService
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const sketches = this.sketchesService.getSketches();
        if (sketches.length === 0) {
            return this.dataStorageService.fetchSketches();
        } else {
            return sketches;
        }

    }
}