import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyComponent } from 'src/app/models/component.model';
import { ComponentsService } from 'src/app/service/components.service';

@Component({
  selector: 'app-change-parameter',
  templateUrl: './change-parameter.component.html',
  styleUrls: ['./change-parameter.component.css']
})
export class ChangeParameterComponent {
  @Input() idOfParameter!: number;

  changeDetailInfo!: FormGroup;
  cancelChanges: boolean = false;
  componentToChange: MyComponent = new MyComponent(0, '', '', new Date, '', '');

  constructor(private service: ComponentsService, private route: Router) {}

  ngOnInit(): void {
    this.service.getComponentById(this.idOfParameter).then((data) => {
      this.componentToChange = data;

      this.changeDetailInfo = new FormGroup({
        title: new FormControl(this.componentToChange.title, Validators.required),
        description: new FormControl(this.componentToChange.description, Validators.required),
        componentCode: new FormControl(this.componentToChange.componentCode, Validators.required),
        notes: new FormControl(this.componentToChange.notes),
      });
    });
  }

  cancelChangeFun() {
    this.cancelChanges = true;
  }

  confirmCancel() {
    this.route.navigate([`/`])
  }

  returnToChanges() {
    this.cancelChanges = false;
  }

  onSubmit() {
    Promise.resolve(this.service.changeComponent(
      this.idOfParameter,
      this.changeDetailInfo.value['description'],
      this.changeDetailInfo.value['title'],
      new Date,
      this.changeDetailInfo.value['componentCode'],
      this.changeDetailInfo.value['notes'],
    )).then(() => {
      this.route.navigate([window.location.origin])
    });
  }
}
