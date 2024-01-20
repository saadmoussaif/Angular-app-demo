import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {

  public productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService : ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]), // Example: minLength validator added
      price: this.fb.control(0, [Validators.required, Validators.min(0)]), // Example: min validator added
      checked: this.fb.control(false)
    });
  }

  saveProduct() {
      let product : Product = this.productForm.value;
      this.productService.saveProduct(product).subscribe(
        {
          next : data => {
            console.log(JSON.stringify(data))
            this.productForm.reset();
          },
          error: err => {
              console.log(err)
          }
        }
      )
  }
}
