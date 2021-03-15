import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { Subitem } from '../model/subitem';
import{ItemService} from '../_services/item.service';
import{SubItemService} from '../_services/sub-item.service';



class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}
@Component({
  selector: 'app-sub-item',
  templateUrl: './sub-item.component.html',
  styleUrls: ['./sub-item.component.css']
})
export class SubItemComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Subitem> = new Subject();
  subitems?: Subitem[];
  subitemObj : Subitem=new Subitem();  
  submitted = false;
  
 

constructor(private subItemService: SubItemService,private http: HttpClient) { }
 
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
              'http://localhost:8080/api/v1/getsubitemList',
              dataTablesParameters, {})
            .subscribe(resp => {
              
                that.subitems = resp.data;
               

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


reloadData() {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    
    // Switch
   
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
   
}

newItem(): void {
  this.submitted = false;
  this.subitemObj = new Subitem();
}

save() {
  if(this.subitemObj.name!="" && this.subitemObj.name!=undefined){
 if(this.subitemObj.id==0 || this.subitemObj.id==undefined){

  this.subItemService
  .createSubItem(this.subitemObj).subscribe((data:any)=> {
    alert(data.message);
    this.subitemObj = new Subitem();
    this.rerender();
    
  }, 
  error => console.log(error));
}
else{
  if(this.subitemObj.id!=undefined && this.subitemObj.id!=0){
  this.subItemService
  .updateSubItem(this.subitemObj.id,this.subitemObj).subscribe((data:any)=> {
    alert(data.message)
    this.subitemObj = new Subitem();
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
  this.subItemService.deleteSubItem(id)
    .subscribe(
      (data:any) => {
       alert(data.message);
        this.reloadData();
      },
      error => console.log(error));
    }
}

editItemDetail(id: number ,name:string ) {
  this.subitemObj.id=id;
  this.subitemObj.name=name;
}

}

