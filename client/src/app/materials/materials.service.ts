import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MaterialsService {
    private materialsUrl = 'assets/materials.json'; // Update the path if necessary

    constructor(private http: HttpClient) { }

    getMaterials(): Observable<any> {
        return this.http.get<any>(this.materialsUrl);
    }
}
