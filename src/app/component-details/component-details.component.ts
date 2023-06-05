import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComponentsService } from '../service/components.service';
import { MyDetails } from '../models/details.model';
import { MyComponent } from '../models/component.model';

@Component({
  selector: 'app-component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.css']
})
export class ComponentDetailsComponent implements OnInit {
  location: any = window.location.protocol;

  public id!: string;

  arrayOfDetails: Array<any> = [];

  searchInput: string = '';
  searchedDetails!: any[];
  componentOfDetails: any = '';
  
  deleteDetail: any = {};

  constructor(private activatedRoute: ActivatedRoute, private service: ComponentsService, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId['id'];

      this.arrayOfDetails = [];
      this.searchedDetails = [];

      Promise.resolve(this.service.getDetailsOfAnElementNew(Number(this.id))).then((data: any) => {
        this.arrayOfDetails = (data as Details).details;
        this.searchedDetails = this.arrayOfDetails;

        Promise.resolve(this.service.getComponentById(Number(this.id))).then((data) => {
          this.componentOfDetails = data;
        })
      })
    });
  }

  deleteDetailFun(_id: number) {
    this.service.getDetailById(_id).then((data: any) => {
      this.deleteDetail = data;
    });
  }

  async confirmDeleteComponent(_id: number) {
    await Promise.resolve(this.service.deleteDetails(_id)).then(() => {
      this.deleteDetail.id = NaN;
    });

    Promise.resolve(this.service.getDetailsOfAnElementNew(Number(this.id))).then((data: any) => {
      this.arrayOfDetails = (data as Details).details;
      this.searchedDetails = this.arrayOfDetails;
    })
  }

  cancelDelete() {
    this.deleteDetail.id = NaN;
  }

  changeDetail(_id: number) {
    this.router.navigate([`/change/detail/${_id}`], {
      skipLocationChange: true,
    });
  }

  addComponent() {
    this.router.navigate([`/addParameter/${this.id}`], {
      skipLocationChange: true,
    });
  }

  searchInputChange() {
    const userInput = this.searchInput.toUpperCase();
    this.searchedDetails = new Array<MyDetails>;

    if(this.searchInput != '') {
      this.arrayOfDetails.map((detail) => {
        if(
          detail.description.toUpperCase().includes(userInput) ||
          detail.parameters.toUpperCase().includes(userInput) ||
          detail.notes.toUpperCase().includes(userInput) ||
          detail.title.toUpperCase().includes(userInput)
        ) {
          this.searchedDetails.push(detail);
        }
      });
    } else {
      this.searchedDetails = this.arrayOfDetails;
    }
  }

  goInHomePage() {
    this.router.navigate(['..'], {
      skipLocationChange: true,
    });
  }
}




interface Details {
  message: string
  details: Detail[]
}

interface Detail {
  id: number
  parameter: string
  description: string
  value: number
  dateEntry: string
  fk: number
  note: string
  greenLimit: number
  yellowLimit: number
}