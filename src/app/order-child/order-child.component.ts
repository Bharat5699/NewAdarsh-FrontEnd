import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../model/item';
import { Order } from '../model/order';
import { ItemService } from '../_services/item.service';

class Game{
  name: string; id: number; selected: boolean;
}

@Component({
  selector: 'app-order-child',
  templateUrl: './order-child.component.html',
  styleUrls: ['./order-child.component.css']
})
export class OrderChildComponent implements OnInit {
@Input() orderObj:Order;
@Input() fdate:string;
@Input() tdate:string;
 
  items?:Item[];
   itemvalue:number=0;

   selected_games: { name: string; id: number; selected: boolean; }[];
   name:string;
   searchText:string = "";
   selected_count:number = 0;
   
   
   // Data Object to List Games
   games :Game[]=[]
   
   // Getting Selected Games and Count
   getSelected(){
      this.selected_games =  this.games.filter( s => {
           return s.selected;
         });
      this.selected_count = this.selected_games.length;    
      // alert(this.selected_games);    
   }
   
   // Clearing All Selections
   clearSelection(){
     this.searchText = "";
     this.games =  this.games.filter( g => {
           g.selected = false;
           return true;
         });
     this.getSelected();    
   }
   
   //Delete Single Listed Game
   deleteGame(id:number){
     this.searchText = "";
     this.games =  this.games.filter( g => {
           if(g.id == id)
           g.selected = false;
           
           return true;
         });
     this.getSelected(); 
   }
   
 

   clearFilter(){
     this.searchText = "";
   }
    constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    
    

      
     
     
      this.itemService.getItemList().subscribe((data: Item[])=>{
        
         for(var i=0;i<data.length;i++) {    
    
            this.games.push({ name: data[i].name,id:data[i].id,selected:false})
         }
        })  ;

        this.getSelected();
  }
  
 


  save() {
   
   }


  onSubmit() {
    // this.submitted = false;
    // this.save();    
  }
}

