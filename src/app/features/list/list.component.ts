import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CardComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductsService);
  router = inject(Router);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit() {
    this.router.navigateByUrl('/edit-product');
  }
}
