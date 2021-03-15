import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../model/item';
import { Subitem } from '../model/subitem';
import{ItemService} from '../_services/item.service';
import { SubItemService } from '../_services/sub-item.service';
import{ChkfilterPipe} from '../chkfilter.pipe'
import { Linkitem } from '../model/linkitem';
import { LinkItemService } from '../_services/link-item.service';

class Game{
  name: string; id: number; selected: boolean;
}

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css']
})
export class LinkItemComponent implements OnInit {
  items?:Item[];
  linkItems:Linkitem[]=[];
  subitemvalue:number=0;
   itemvalue:number=0;
   expand=false;
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
    constructor(private itemService: ItemService,private subitemService: SubItemService,private linkItemService:LinkItemService) {}

  ngOnInit(): void {
    
    this.itemService.getItemList().subscribe((data: Item[])=>{
      this.items =data;  
        
      });

      
     
     
      this.subitemService.getSubItemList().subscribe((data: Subitem[])=>{
        
         for(var i=0;i<data.length;i++) {    
    
            this.games.push({ name: data[i].name,id:data[i].id,selected:false})
         }
        })  ;

        this.getSelected();
  }
  
 


  save() {
   if(this.itemvalue != 0){
   for(var i=0;i<this.selected_games.length;i++){
this.linkItems.push({id:0,item_id: this.itemvalue,subitem_id:this.selected_games[i].id})
   }
      if(this.linkItems.length !=0){
   
        this.linkItemService
        .createItem(this.linkItems).subscribe((data:any)=> {
          alert(data.message);
         
          
        }, 
        error => console.log(error) );
      }
      else alert("Please Select SubItems")
  }
  else{
    alert("Please Select Item")
  }
  this.linkItems = [];
  }

    itemchange(){
     this.clearSelection();
      this.searchText = "";
    this.linkItemService.getItemList(this.itemvalue).subscribe((data: Linkitem[])=>{
          
     
        
      this.games =  this.games.filter( g => {
    
        for(var i=0;i<data.length;i++) {  
          
            if(g.id == data[i].subitem_id){            
              g.selected = true;
            
            
            }
            
         
       
      } 
      return true;
          });

          
        
      this.getSelected(); 

       
      
          
   
     })  ;
   }
}
