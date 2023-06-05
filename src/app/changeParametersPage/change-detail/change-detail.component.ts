import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyDetails } from 'src/app/models/details.model';
import { ComponentsService } from 'src/app/service/components.service';

@Component({
  selector: 'app-change-detail',
  templateUrl: './change-detail.component.html',
  styleUrls: ['./change-detail.component.css']
})
export class ChangeDetailComponent implements OnInit {
  @Input() idOfDetail!: number;

  changeDetailInfo!: FormGroup;
  cancelChanges: boolean = false;
  detailToChange!: any;

  constructor(private service: ComponentsService, private route: Router) {}

  ngOnInit(): void {
    this.service.getDetailByIdNew(this.idOfDetail).then((data) => {
      this.detailToChange = data;

      this.changeDetailInfo = new FormGroup({
        parameter: new FormControl(this.detailToChange.description, Validators.required),
        description: new FormControl(this.detailToChange.parameter, Validators.required),
        notes: new FormControl(this.detailToChange.note),
        greenLimit: new FormControl(this.detailToChange.greenLimit, [Validators.required, Validators.pattern("^[0.0-9.9]*$")]),
        yellowLimit: new FormControl(this.detailToChange.yellowLimit, [Validators.required,  Validators.pattern("^[0.0-9.9]*$")]),
      });
    });
  }

  cancelChangeFun() {
    this.cancelChanges = true;
  }

  confirmCancel() {
    this.route.navigate([`/componentDetails/${this.detailToChange.fk}`], {
      skipLocationChange: true,
    })
  }

  returnToChanges() {
    this.cancelChanges = false;
  }

  onSubmit() {
    Promise.resolve(this.service.changeDetail(
      this.idOfDetail, 
      this.changeDetailInfo.value.parameter,
      this.changeDetailInfo.value.description,
      this.changeDetailInfo.value.notes,
      this.changeDetailInfo.value.greenLimit,
      this.changeDetailInfo.value.yellowLimit
    )).then(() => {
      this.route.navigate(['componentDetails/' + this.detailToChange.fk], {
        skipLocationChange: true,
      })
    });
  }
}
