import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-product-catalog',  
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  isAdmin:boolean = false;

  // Variables pour la promotion
  isPromotionModalOpen: boolean = false;
  promotionValue: number = 0;
  startDate: string = '';
  endDate: string = '';
  selectedProduct: any = null;

  constructor(private productService: ProductService, private readonly userService: UsersService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.isAdmin = this.userService.isAdmin()
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.filteredProducts = data;
        this.getCategories();
      },
      error => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    );
  }

  getCategories() {
    this.categories = [...new Set(this.products.map(product => product.categorie).filter(Boolean))];
  }

  filterByCategory() {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(product => product.categorie === this.selectedCategory);
    } else {
      this.filteredProducts = this.products;
    }
    this.currentPage = 1;
  }

  // Ouvre la fenêtre modale pour appliquer une promotion
  openPromotionModal(product: any) {
    this.isPromotionModalOpen = true;
    this.selectedProduct = product;
  }

  // Ferme la fenêtre modale
  closePromotionModal() {
    this.isPromotionModalOpen = false;
    this.promotionValue = 0;
    this.startDate = '';
    this.endDate = '';
    this.selectedProduct = null;
  }

  // Applique la promotion au produit sélectionné
  applyPromotion() {
    if (this.selectedProduct) {
        const promotionData = {
            promotion: this.promotionValue,
            startDate: this.startDate, // Assurez-vous du format
            endDate: this.endDate      // Assurez-vous du format
        };
    
        this.productService.addPromotionToProduct(this.selectedProduct.id, promotionData).subscribe(
            response => {
                console.log('Promotion appliquée avec succès', response);
                this.closePromotionModal();
                this.loadProducts();
            },
            error => {
                console.error('Erreur lors de l\'application de la promotion', error);
            }
        );
    }
}

}
