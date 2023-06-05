import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableOfComponentsComponent } from './table-of-components/table-of-components.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentDetailsComponent } from './component-details/component-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ChangeComponentComponent } from './changeParametersPage/change-component/change-component.component';
import { ChangeDetailComponent } from './changeParametersPage/change-detail/change-detail.component';
import { ChangeParameterComponent } from './changeParametersPage/change-parameter/change-parameter.component';
import { AddParameterComponent } from './add-parameter/add-parameter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TableOfComponentsComponent,
    AddComponentComponent,
    ComponentDetailsComponent,
    NavBarComponent,
    ChangeComponentComponent,
    ChangeDetailComponent,
    ChangeParameterComponent,
    AddParameterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
