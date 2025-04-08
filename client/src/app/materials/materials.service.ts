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

    addMaterial(material: Material): Observable<Material> {
        return this.http.post<Material>(this.apiUrl, material);
    }
    updateMaterial(id: string, material: Material): Observable<Material> {
        return this.http.put<Material>(`${this.apiUrl}/${id}`, material);
    }

    deleteMaterial(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}