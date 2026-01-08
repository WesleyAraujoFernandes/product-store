import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule
} from '@angular/material/dialog';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ConfirmationDialogService } from './../../shared/services/confirmation-dialog.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CardComponent,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductsService);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService);

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }
  /*
  onDelete(product: Product) {
    this.confirmationDialogService.openDialog()
      .pipe(filter(answer => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe((answer) => {
          this.productsService.getAll().subscribe((products) => {
            this.products = this.products;
          });
        });
      });
  }
  onDelete(product: Product) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.products = this.products.filter(p => p.id !== product.id);
        });
      });
  }

      */
  onDelete(product: Product) {
    this.confirmationDialogService
      .openDialog()
      .pipe(
        filter(Boolean),
        switchMap(() => this.productsService.delete(product.id)),
        switchMap(() => this.productsService.getAll())
      )
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (err) => {
          console.error('Erro ao deletar produto', err);
        }
      });
  }

}
