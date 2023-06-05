import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentsService } from '../service/components.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-parameter',
  templateUrl: './add-parameter.component.html',
  styleUrls: ['./add-parameter.component.css']
})
export class AddParameterComponent {
  addParameterForm!: FormGroup;
  FK!: number;

  constructor(private service: ComponentsService, private router: Router, private activatedRoute: ActivatedRoute) {}

  cancelChanges: boolean = false;

  ngOnInit(): void {
    this.addParameterForm = new FormGroup ({
      title: new FormControl('', Validators.required),
      parameter: new FormControl('', Validators.required),
      greenLimit: new FormControl('', [Validators.required,  Validators.pattern("^[0.0-9.9]*$")]),
      yellowLimit: new FormControl('', [Validators.required,  Validators.pattern("^[0.0-9.9]*$")]),
      notes: new FormControl(''),
    });

    this.activatedRoute.params.subscribe(paramsFk => {
      this.FK = paramsFk['id'];
    });
  }

  onSubmit() {
    let form = this.addParameterForm.value;

    Promise.resolve(this.service.addParameter(
      this.addParameterForm.value.title, 
      this.addParameterForm.value.parameter, 
      0, 
      this.FK, 
      this.addParameterForm.value.notes, 
      this.addParameterForm.value.greenLimit, 
      this.addParameterForm.value.yellowLimit
    )).then(() => {
      this.router.navigate([`/componentDetails/${this.FK}`]);
    });
  }

  confirmCancel() {
    this.router.navigate([`/componentDetails/${this.FK}`
  ])
  }

  returnToChanges() {
    this.cancelChanges = false;
  }

  cancelChangeFun() {
    this.cancelChanges = true;
  }
}
