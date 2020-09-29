import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { ProductApiService } from 'src/app/api/product-api.service';
import { StockApiService } from 'src/app/api/stock-api.service';
import { Product } from 'src/app/models/product.model';
import { Stock } from 'src/app/models/stock.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input()
  product : Product;
  modifiedProduct : Product;
  stock : Stock;
  modifiedStock : Stock;
  errorMessageProduct : string;
  errorMessageStock : string;
  isFormVisible : boolean = false;
  isBtnModifyVisible : boolean = true;
  isDataAvailable:boolean = false;
  @Input()
  devise : string;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private productService : ProductApiService,
              private stockService : StockApiService) { }

  ngOnInit(): void {

    // let id = +this.route.snapshot.paramMap.get("id");

    // this.productService.getProductById(id).subscribe({
    //   next: data => {
    //     this.product = data;
    //   },
    //   error: err => this.errorMessage = err
    // });

    this.stockService.getStockById(this.product.id).subscribe({
      next: data => {
        this.stock = data;
        this.modifiedStock = {...this.stock};
        this.isDataAvailable = true;
      },
      error: err => {
        console.log("ERROR IN METHOD");
        console.log(err)
      }
    });

    this.modifiedProduct = {...this.product};;
    
  }

  

  onModify() : void {
    this.isFormVisible = true;
    this.isBtnModifyVisible = false;
    this.devise = "€";
  }

  onCancelModifications() : void {
    this.modifiedProduct = {...this.product};
    this.modifiedStock = {...this.stock};
    this.isFormVisible = false;
  }

  onUpdateProduct() : void {
    // ICI APPEL A SERVICE + UPDATE PRODUCT
    if(this.modifiedProduct == this.product && this.modifiedStock == this.stock) {
      console.log("aucun changement !");
    } else {
      if(this.modifiedProduct != this.product) {
        console.log("le produit a été modifié");
        this.productService.updateProduct(this.modifiedProduct).subscribe({
          next: data => {
            this.product = data;
          },
          error: () => {
            this.errorMessageProduct = "Problème de mise à jour du produit.";
            this.modifiedProduct = {...this.product};
          }
        })
      }
      if(this.modifiedStock != this.stock) {
        console.log("le stock a été modifié");
        console.log("stock initial : ");
        console.log(this.stock);
        console.log("stock modifié : ");
        console.log(this.modifiedStock);
        this.stockService.updateStock(this.modifiedStock).subscribe({
          next: data => {
            this.stock = data;
          },
          error: err => {
            this.errorMessageStock = "Problème de mise à jour du stock."
            console.log(this.errorMessageStock);
            console.log(err);
            this.modifiedStock = {...this.stock};
          }
        })
      }
    }
    this.isFormVisible = false;
  }


  convertCurrency(price: number) : number {
    var displayedPrice : number;
    switch(this.devise) {
      case "$": {
        displayedPrice = price*1.1;
        break;
      }
      case "£": {
        displayedPrice = price*1.5;
        break;
      }
      case "Y": {
        displayedPrice = price*123;
        break;
      }
      default: {
        displayedPrice = price;
        break;
      }
    }
    return displayedPrice;
  }

}
