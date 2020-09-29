import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductApiService } from '../../api/product-api.service';
import { ConverterApiService } from '../../api/converter-api.service';
import { Product } from './../../models/product.model';
import { Stock } from './../../models/stock.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // PROPRIETES :
  filteredProducts : Product[];
  products : Product[];
  selectedProduct : Product;
  isSelected : boolean = false;
  stocks : Stock[];
  errorMessage : string;
  devise : string;

  _listFilterByName : string;
  _listFilterByCategory : string;
  _listFilterByBrand : string;

  pageTitle : string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 50;

  dollarValue: number;
  poundValue: number;
  yenValue: number;

  // CONSTRUCTEUR :
  constructor(private productApi: ProductApiService,
    private converterService: ConverterApiService,
    private router : Router) { }

  // GESTION DES FILTRES :
  get listFilterByName() : string {
        return this._listFilterByName;
  }
  set listFilterByName(value : string) {
        this._listFilterByName = value;
        this.filteredProducts = this._listFilterByName ? this.performFilter(this.listFilterByName) : this.products;
  }
  get listFilterByCategory() : string {
    return this._listFilterByCategory;
  }
  set listFilterByCategory(value : string) {
    this._listFilterByCategory = value;
    this.filteredProducts = this._listFilterByCategory ? this.performFilter(this.listFilterByCategory) : this.products;
  }
  get listFilterByBrand() : string {
    return this._listFilterByBrand;
  }
  set listFilterByBrand(value : string) {
    this._listFilterByBrand = value;
    this.filteredProducts = this._listFilterByBrand ? this.performFilter(this.listFilterByBrand) : this.products;
  }

  performFilter(filter : string) : any[] {
    return this.products.filter( (product : Product ) =>
    product.nom.toLocaleLowerCase().lastIndexOf(filter) !== -1 );
  }

  

  // INITIALISATION DU COMPONENT :
  ngOnInit(): void {
    this.productApi.getProducts().subscribe({
      next:products => {
        this.products = products;
        
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });

    this.converterService.convertFromEuro("USD",1).subscribe({
      next:(data) => {this.dollarValue = data,
                      console.log("dollar value : " + data)}
    });
    this.converterService.convertFromEuro("GBP",1).subscribe({
      next: (data) => this.poundValue = data
    });
    this.converterService.convertFromEuro("JPY",1).subscribe({
      next: (data) => this.yenValue = data
    })
    this.devise = "€";
    // this.poundValue = 1.5;
    // this.dollarValue = 0.91;
    // this.yenValue = 123;
  }

  // REDIRECTION VERS PRODUCT-DETAIL
  goToDetails(productId: number, product: Product) : void {
    this.selectedProduct = product;
    this.isSelected = true;
    // this.router.navigateByUrl('/product-detail/' + productId);
  }

  onBack() : void {
    this.selectedProduct = null;
    this.isSelected = false;
  }

  convertCurrency(price: number) : number {
    var displayedPrice : number;
    switch(this.devise) {
      case "$": {
        displayedPrice = price*this.dollarValue;
        break;
      }
      case "£": {
        displayedPrice = price*this.poundValue;
        break;
      }
      case "Y": {
        displayedPrice = price*this.yenValue;
        break;
      }
      default: {
        displayedPrice = price;
        break;
      }
    }
    return displayedPrice;
  }

  onEUR() : void {
    this.devise = "€";
  }

  onUSD() : void {
    this.devise = "$";
  }

  onGBP() : void {
    this.devise = "£";
  }

  onJPY() : void {
    this.devise = "Y";
  }
}
