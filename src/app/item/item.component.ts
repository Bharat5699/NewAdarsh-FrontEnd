import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { Item } from '../model/item';
import{ItemService} from '../_services/item.service';



class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Item> = new Subject();
  items?: Item[];
  itemobj : Item=new Item();  
  submitted = false;
  
 

constructor(private itemService: ItemService,private http: HttpClient) { }

ngOnInit(): void {
  const that = this;

  this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
            .post<DataTablesResponse>(
              'http://localhost:8080/api/v1/getitemList',
              dataTablesParameters, {})
            .subscribe(resp => {
              
                that.items = resp.data;

               callback({
                
                    recordsTotal: resp.recordsTotal,  
                    recordsFiltered: resp.recordsFiltered,                  
                    data: []
                });
            });
      },
      columns: [
          { data: 'id',searchable: false }, { data: 'name'  }
      ]
  };
}

newItem(): void {
  this.submitted = false;
  this.itemobj = new Item();
}

save() {
  if(this.itemobj.name!="" && this.itemobj.name!=undefined){
 if(this.itemobj.id==0 || this.itemobj.id==undefined){

  this.itemService
  .createItem(this.itemobj).subscribe((data:any)=> {
    alert(data.message);
    this.itemobj = new Item();
    this.rerender();
  }, 
  error => console.log(error));
}
else{
  if(this.itemobj.id!=undefined && this.itemobj.id!=0){
  this.itemService
  .updateItem(this.itemobj.id,this.itemobj).subscribe((data:any)=> {
    alert(data.message)
    this.itemobj = new Item();
    this.rerender();
  }, 
  (error:any) => console.log(error));
}
}
  

}
else{
  alert("please Enter Item Name");
}

}


onSubmit() {
  this.submitted = false;
  this.save();    
}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}


 
deleteItem(id: number | undefined) {
  if(id!== undefined){
  this.itemService.deleteItem(id)
    .subscribe(
      (data:any) => {
       alert(data.message);
       this.rerender();
      },
      error => console.log(error));
    }
}

editItemDetail(id: number ,name:string ) {
  this.itemobj.id=id;
  this.itemobj.name=name;
}

}