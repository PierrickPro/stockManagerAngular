import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ItemService } from './item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public items: Item[] = [];
  public editItem: Item | undefined;
  public deleteItem: Item | undefined;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
      this.getItems();
  }

  public getItems(): void{
    this.itemService.getItems().subscribe(
      (response: Item[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddItem(addForm: NgForm): void{
    document.getElementById('add-item-form')?.click();

    this.itemService.addItem(addForm.value).subscribe(
      (response: Item) => {
        console.log(response);
        this.getItems();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

  public onEditItem(item: Item): void{
    this.itemService.updateItem(item).subscribe(
      (response: Item) => {
        console.log(response);
        this.getItems();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeleteItem(itemId: number): void{
    this.itemService.deleteItem(itemId).subscribe(
      (response: void) => {
        console.log(response);
        this.getItems();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onOpenModal(item: Item | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addItemModal');
    }
    if (mode === 'edit') {
      this.editItem = item;
      button.setAttribute('data-target', '#editItemModal');
    }
    if (mode === 'delete') {
      this.deleteItem = item;
      button.setAttribute('data-target', '#deleteItemModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public searchItems(key: string): void{
    console.log(key);
    const results: Item[] = [];
    for (const item of this.items) {
      if(
        item.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || item.category.toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || item.quantity.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1 
        || item.price.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1){
          results.push(item); //push all present items
        }
      }
    this.items = results;

    if(results.length === 0 || !key){
      this.getItems();
    }
  }
}
