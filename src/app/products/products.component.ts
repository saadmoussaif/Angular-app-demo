import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public products: Array<Product> = [];

  // products$! : Observable<Array<Product>>;
  public keyword: string = "";

  loading :boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getProducts();
    this.loading = false;
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe({
        next: data => this.products = data,
        error: err => console.log(err)
      })
  }

  handleCheckProduct(product: Product) {
    this.loading = true;
    this.productService.checkProduct(product).subscribe(
      {
        next: updatedProduct => {
          let index = this.products.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.loading = false;
        }
      }
    )

  }


  handleDeleteProduct(product: Product) {
    if (confirm("Are you sur you ?"))
      this.loading = true;
      this.productService.deleteProduct(product).subscribe(
        {
          next: deletedProduct => {
            let index = this.products.findIndex(p => p.id === product.id);
            if (index !== -1) {
              this.products.splice(index, 1); // Remove the product from the array
            }
            this.loading = false;
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            this.loading = false;
          }
        }
      )
  }

  searchProducs() {
    this.loading = true;
    this.productService.searchProducts(this.keyword).subscribe({
      next: value => {
        this.products = value;
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }
}
