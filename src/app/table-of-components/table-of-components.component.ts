import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../service/components.service';
import { MyComponent } from '../models/component.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-table-of-components',
  templateUrl: './table-of-components.component.html',
  styleUrls: ['./table-of-components.component.css']
})
export class TableOfComponentsComponent implements OnInit {
  location: any = window.location.protocol;

  constructor (private componentService: ComponentsService, private router: Router) {
    this.components = [];
    this.searchedComponents = [];
  }

  deleteItem: MyComponent = new MyComponent(NaN, '', '', new Date(), '', '');

  idOfComponent: number = 1;
  searchInput: string = '';

  components: MyComponent[] = new Array<MyComponent>();
  searchedComponents: MyComponent[] = new Array<MyComponent>();

  ngOnInit(): void {
    this.components = [];
    this.searchedComponents = [];

    document.getElementById('databaseContents')?.remove();

    this.components = new Array<MyComponent>();

    Promise.resolve(this.componentService.getComponents()).then((data: MyComponent[]) => {
      this.components = data;
      this.searchedComponents = this.components;
    });
  }

  itemClicked(_id: number) {
    this.router.navigate([`/componentDetails/${_id}`]);
  }

  deleteComponent(_id: number) {
    this.componentService.getComponentById(_id).then((data) => {this.deleteItem = data});
  }

  cancelDelete() {
    this.deleteItem.id = NaN;
  }

  confirmDeleteComponent(_id: number) {
    Promise.resolve(this.componentService.deleteComponent(_id)).then(() => {
      Promise.resolve(this.componentService.getComponents()).then((data) => {
        this.components = data;
        this.searchedComponents = data;
      });
    });

    this.deleteItem.id = NaN;
  }

  changeComponent(_id: number) {
    this.router.navigate([`/change/parameter/${_id}`]);
  }

  addComponent() {
    this.router.navigate([`/addComponent`]);
  }

  searchInputChange() {
    const userInput = this.searchInput.toUpperCase();
    this.searchedComponents = new Array<MyComponent>;

    if(this.searchInput != '') {
      this.components.map((component) => {
        if(
          component.description.toUpperCase().includes(userInput) ||
          component.componentCode.toUpperCase().includes(userInput) ||
          component.notes.toUpperCase().includes(userInput) ||
          component.title.toUpperCase().includes(userInput)
        ) {
          this.searchedComponents.push(component);
        }
      });
    } else {
      this.searchedComponents = this.components;
    }
  }
}
