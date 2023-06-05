import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-change-component',
  templateUrl: './change-component.component.html',
  styleUrls: ['./change-component.component.css']
})
export class ChangeComponentComponent implements OnInit {
  id!: number;
  typeRequest!: string; // parameter detail

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId['id'];
    });

    
    this.activatedRoute.params.subscribe(typeReuqestParam => {
      this.typeRequest = typeReuqestParam['type'];
    });
  }
}
