import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../material.model';

@Injectable({
    providedIn: 'root'
})
export class MaterialsService {
    private apiURL = 'http://localhost:3000/api/materials'
    

    constructor(private http: HttpClient) { }

    getMaterials(): Observable<any> {
        return this.http.get<Material[]>(this.apiURL);
    }
}
