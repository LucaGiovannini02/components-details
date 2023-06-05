import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentsService } from '../service/components.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {
  addComponentForm!: FormGroup;

  constructor(private service: ComponentsService, private router: Router) {}

  cancelChanges: boolean = false;

  ngOnInit(): void {
    this.addComponentForm = new FormGroup ({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      componentCode: new FormControl('', Validators.required),
      notes: new FormControl(''),
    });
  }

  onSubmit() {
    Promise.resolve(this.service.addComponent(
      this.addComponentForm.value.title, 
      this.addComponentForm.value.description, 
      this.addComponentForm.value.componentCode,
      this.addComponentForm.value.notes,
    )).then(() => {
      this.router.navigate(['/'], {
        skipLocationChange: true,
      })
    });
  }

  confirmCancel() {
    this.router.navigate(['/'], {
      skipLocationChange: true,
    })
  }

  returnToChanges() {
    this.cancelChanges = false;
  }

  cancelChangeFun() {
    this.cancelChanges = true;
  }
}
