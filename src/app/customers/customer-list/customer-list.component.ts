import { Component, OnInit } from '@angular/core';
import { ICustomer } from './customer';
import { CustomerApiService } from '../../api/customer-api.service';
import { Router } from '@angular/router';



@Component({
 // selector: 'app-customers',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {


  _listFilter : string;

  get listFilter() : string {
    return this._listFilter;
  }

  set listFilter(value : string) {
    this._listFilter = value;
    this.filteredCustomers = this._listFilter ? this.performFilter(this.listFilter) : this.customers;
  }

  filteredCustomers : ICustomer[];
  customers : ICustomer[];
  errorMessage : string;
  

  constructor(private customerApiService : CustomerApiService,
              private router : Router) { }

  performFilter(filter : string) : any[]{
    return this.customers.filter( (customer : ICustomer) =>
    customer.nom.toLocaleLowerCase().lastIndexOf(filter) !== -1);
    //chercher méthode pour pas de diff entre les castes.
  }

  goToDetails(customerId: number) {
    this.router.navigateByUrl('/customer-detail/' + customerId);
  }

  ngOnInit(): void {
    this.customerApiService.getCustomers().subscribe({
      next:customers => {
        console.log("======= IN ngOninit de customerlist component========")
        this.customers = customers;
        this.filteredCustomers = this.customers;
      },
      error: err => {
        console.log('========= erreur de retour ngOnInit dans customer list component ===========');
      this.errorMessage = err 
    }

    });
  }

}
