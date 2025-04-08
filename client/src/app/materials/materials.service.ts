import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../material.model';

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private apiUrl = 'http://localhost:3000/api/materials'; // Ensure this matches your backend

    constructor(private http: HttpClient) { }

    getMaterials(): Observable<Material[]> {
        return this.http.get<Material[]>(this.apiUrl);
    }
}
// this is a note jus so there's a change to make these merge?