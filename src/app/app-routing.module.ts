import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponentComponent } from './add-component/add-component.component';
import { TableOfComponentsComponent } from './table-of-components/table-of-components.component';
import { ComponentDetailsComponent } from './component-details/component-details.component';
import { ChangeComponentComponent } from './changeParametersPage/change-component/change-component.component';
import { AddParameterComponent } from './add-parameter/add-parameter.component';


const routes: Routes = [
  {path: 'addComponent', component: AddComponentComponent},
  {path: 'addParameter/:id', component: AddParameterComponent},
  {path: '', component: TableOfComponentsComponent},
  {path: 'componentDetails/:id', component: ComponentDetailsComponent},
  {path: 'change/:type/:id', component: ChangeComponentComponent},
  {path: 'change/:type/:id', component: ChangeComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
