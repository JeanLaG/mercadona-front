import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    // Initialisation du formulaire
    this.productForm = this.fb.group({
      libelle: [''],
      description: [''],
      prix: [''],
      categorie: ['']
    });
  }

  // Méthode pour sélectionner un fichier
  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Soumission du formulaire
  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const productData = this.productForm.value;

      this.productService.createProduct(productData, this.selectedFile).subscribe(
        (response) => {
          console.log('Produit créé avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de la création du produit', error);
        }
      );
    } else {
      console.error('Le formulaire est invalide ou aucun fichier n\'a été sélectionné !');
    }
  }
}
