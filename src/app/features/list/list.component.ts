import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductsService);
  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
}
