import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/admin/api/products';

  constructor(private http: HttpClient) { }

  // Ajout du token dans les headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Méthode pour créer un produit
  createProduct(productData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('libelle', productData.libelle);
    formData.append('description', productData.description);
    formData.append('prix', productData.prix.toString());
    formData.append('categorie', productData.categorie);
    formData.append('image', imageFile);

    return this.http.post(`${this.baseUrl}/create`, formData, { headers: this.getAuthHeaders() });
  }

  // Méthode pour ajouter une promotion

  addPromotionToProduct(productId: number, promotionData: any): Observable<any> {
    return this.http.put(
        `http://localhost:8080/auth/api/products/promotion/${productId}`,
        promotionData,
        { headers: this.getAuthHeaders() }
    );
}



  // Méthode pour récupérer tous les produits
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:8080/auth/api/products/all');
  }
}
