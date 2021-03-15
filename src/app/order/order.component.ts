import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { Order } from '../model/order';
import{ItemService} from '../_services/item.service';
import { OrderService } from '../_services/order.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements  OnInit {
  parentCom=true;
  addmenuCom=false;
  orders: Order[];
  orderObj : Order=new Order();  
  submitted = false;
  fdate:string='';
  tdate:string='';
  constructor(private orderService: OrderService,private http: HttpClient,private datePipe:DatePipe) { }


  ngOnInit(): void {
    this.getOrderDetails();
  }


  getOrderDetails(){
    this.orderService.getOrderList().subscribe((data: Order[])=>{
      this.orders=data;
      
     })  ;
   

  }
  
  newItem(): void {
    this.submitted = false;
    this.orderObj = new Order();
  }
  
  searchOrder(){
    
    if(this.fdate!='' ){
      this.orderObj.from_date=new Date(this.fdate);
     
    }
    if( this.tdate!=''){
      this.orderObj.to_date=new Date(this.tdate);
    }
    this.orderService
    .searchOrderList(this.orderObj).subscribe((data: Order[])=> {
      // alert(data.message);
      // this.orderObj = new Order();
      // this.fdate='';
      // this.tdate='';
      // this.getOrderDetails();
      this.orders=data;
    }, 
    error => console.log(error)); 
  }
  save(): boolean {
   

    if(this.orderObj.name=="" || this.orderObj.name==undefined){
        alert("Please Enter Name");
        return false;
    }
    if(this.orderObj.mobile_no==null || this.orderObj.mobile_no==undefined){
      alert("Please Enter Name");
      return false;
  }
  if(this.orderObj.mobile_no.toString().length<10 ){
    alert("Please 10 Digit Of Mobile Number");
    return false;
}

    if(this.fdate=="" || this.fdate==undefined){
      alert("Please Enter From Date");
      return false;
  }
    if(this.tdate=="" || this.tdate==undefined){
      alert("Please Enter To Date");
      return false;
  }

  if(this.orderObj.address=="" || this.orderObj.address==undefined){
    alert("Please Enter Address");
    return false;
}


      this.orderObj.from_date=new Date(this.fdate);
      this.orderObj.to_date=new Date(this.tdate);
      if(this.orderObj.from_date > this.orderObj.to_date){
        alert("Please Valid Date");
        return false;
    }

   if(this.orderObj.id==0 || this.orderObj.id==undefined){
  
    this.orderService
    .createOrder(this.orderObj).subscribe((data:any)=> {
      alert(data.message);
      this.orderObj = new Order();
      this.fdate='';
      this.tdate='';
      this.getOrderDetails();
      
    }, 
    error => console.log(error));
  }
  else{
    if(this.orderObj.id!=undefined && this.orderObj.id!=0){
    this.orderService
    .updateOrder(this.orderObj.id,this.orderObj).subscribe((data:any)=> {
      alert(data.message)
      this.orderObj = new Order();
      this.fdate='';
      this.tdate='';
      this.getOrderDetails();
      
    }, 
    (error:any) => console.log(error));
  }
 
  }
    
 
  return true;
 
  }
  
  
  onSubmit() {
    this.submitted = false;
    this.save();    
  }
  
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  
  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  
  // }
  
  
  
  
  
   
  // deleteItem(id: number | undefined) {
  //   if(id!== undefined){
  //   this.itemService.deleteItem(id)
  //     .subscribe(
  //       (data:any) => {
  //        alert(data.message);
  //        this.rerender();
  //       },
  //       error => console.log(error));
  //     }
  // }
  
  editItemDetail(eOrder:Order) {
    this.orderObj=eOrder;
    
    let f_date = new Date(eOrder.from_date.toString().substring(0,10));
    let t_date = new Date(eOrder.to_date.toString().substring(0,10));
    let fmonth='';
    let fday='';
    let tmonth='';
    let tday='';
let year=f_date.getFullYear();
let month=f_date.getMonth()+1;
let day =f_date.getDate();

let lm=month.toString().length;
let ld=day.toString().length;

if(lm==1){
  fmonth='0'+month;
}else{
  fmonth+=month;
}
if(ld==1){
  fday='0'+day;
}else{
  fday+=day;
}
  
this.fdate=year+'-'+fmonth+'-'+fday;

 year=t_date.getFullYear();
 month=t_date.getMonth()+1;
 day =t_date.getDate();

  lm=month.toString().length;
 ld=day.toString().length;
 if(lm==1){
  tmonth='0'+month;
}else{
  tmonth+=month;
}
if(ld==1){
  tday='0'+day;
}else{
  tday+=day;
}
this.tdate=year+'-'+tmonth+'-'+tday;
  
  
  }

  addmenuDetails(eOrder:Order) {
    this.editItemDetail(eOrder);
    this.parentCom=false;
    this.addmenuCom=true;
  }

  clear(){
    this.orderObj = new Order();
    this.fdate='';
    this.tdate='';
    this.getOrderDetails();
  }

  
}
