import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ItemService } from './item.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public items: Item[] = [];

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


  public onOpenModal(employee: Item | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addItemModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateItemModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteItemModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
