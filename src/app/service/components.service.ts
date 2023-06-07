import { Component, Injectable } from '@angular/core';
import { MyComponent } from '../models/component.model';
import { Router } from '@angular/router';
import { MyDetails } from '../models/details.model';
import { Title } from '@angular/platform-browser';
import { AUTO_STYLE, keyframes } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerJson } from '../models/serverJson.model';
import { Observable } from 'rxjs';
import { detailJsonRequestServer } from '../models/detailJsonRequestServer.component';
import { _ParseAST } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {
  private components: Array<MyComponent> = new Array();
  private details: Array<any> = new Array<any>();
  

  private linkRootApi = "https://192.168.0.116:8999/";

  constructor(private http: HttpClient) { }

  async getComponents() {
    this.components = [];

    let res; 

    res = await this.http.get(`${this.linkRootApi}Api/Components/ShowAllComponents`).toPromise().then((data) => {
      return JSON.stringify(data);
    });

    JSON.parse(res).components.map((data: ServerJson) => {
      this.components.push(new MyComponent(data.id, data.task, data.device, new Date(data.dateEntry), data.productItem, data.note));
    });

    return this.components;
  }

  getComponentById(_id: number) {
    let componentById: any;

    return Promise.resolve(this.getComponents()).then(() => {
      this.components.map((component) => {
        if (component.id == _id) {
          componentById = component;
        }
      });
  
      return { ...componentById };
    });
  }

  async addComponent(_title: string, _description: string, _componentCode: string, _note: string) {
    await Promise.resolve(this.http.post(`${this.linkRootApi}api/Components/InsertNewComponent`, {
      "id": 0,
      "device": _description,
      "task": _title,
      "dateEntry": new Date(),
      "productItem": _componentCode,
      "note": _note,
      "pathimage": ""
    }, {responseType: 'text'}).subscribe((data) => {console.log(data)}));
  }

  getDetailsOfAnElement(_id: number) {
    return Promise.resolve(this.getDetails()).then(() => {
      let detailsToReturn = Array<MyDetails>();

      this.details.map((detail) => {
        if (detail.FK == _id) {
          detailsToReturn.push(detail);
        }
      });

      return detailsToReturn;
    });
  }

  async deleteComponent(_id: any) {
    await Promise.resolve(this.http.delete(`${this.linkRootApi}api/Components/DeleteComponents?IdComponent=${_id}`, {responseType: 'text'}).toPromise().then());
  }

  getDetailById(_id: number) {
    return Promise.resolve(this.getDetails()).then(() => {
      let detailById: MyDetails = new MyDetails(NaN, '', '', new Date(), '', NaN, '');

        this.details.map((detail) => {
          if (detail.id == _id) {
            detailById = detail;
          }
        });

        return { ...detailById };
      }
    );
  }

  getDetailByIdNew(_id: number) {
    return Promise.resolve(this.getDetails()).then(() => {
      let detailById: any;

        this.details.map((detail) => {
          if (detail.id == _id) {
            detailById = detail;
          }
        });

        return { ...detailById };
      }
    );
  }


  async getDetailsOfAnElementNew(_id: number) {
    let ausReturn = await this.http.get(`${this.linkRootApi}api/Details/ShowSelectedDetails?IdComponent=${_id}`).toPromise().then((data) => {return data;});

    return ausReturn;
  }

    

  async deleteDetails(_id: number) {
    await this.http.delete(`${this.linkRootApi}api/Details/DeleteDetails?IdDetail=${_id}`, {responseType: 'text'}).toPromise().then();
  }

  async addParameter(_title: string, _parameter: string, _value: number, _fk: number, _note: string, _greenLimit: number, _yellowLimit: number) {
    await this.http.post(`${this.linkRootApi}api/Details/InsertNewDetail`, {
      "id": 0,
      "parameter": _parameter,
      "description": _title,
      "value": _value,
      "dateEntry": new Date,
      "fk": _fk,
      "note": _note,
      "greenLimit": _greenLimit,
      "yellowLimit": _yellowLimit
    }, {responseType: 'text'}).toPromise().then();
  }

  async changeComponent(_id: number, _device: string, _task: string, _dateEntry: Date, _productItem: string, _note: string) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    await this.http.patch(`${this.linkRootApi}api/Components/ModifyComponent`, {
      "id": _id,
      "device": _device,
      "task": _task,
      "dateEntry": _dateEntry,
      "productItem": _productItem,
      "note": _note,
      "pathImage": ""
    }, {headers: header, responseType: 'text'}).toPromise().then();
  }

  async changeDetail(_id: number, _parameter: string, _description: string, _note: string, _greenLimit: number, _yellowLimit: number) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    await this.http.patch(`${this.linkRootApi}api/Details/ModifyDetail`, {
      "id": _id,
      "parameter": _parameter,
      "description": _description,
      "dateEntry": new Date,
      "fk": 0,
      "note": _note,
      "greenLimit": _greenLimit,
      "yellowLimit": _yellowLimit
    }, {headers: header, responseType: 'text'}).toPromise().then();
  }



  async getDetails() {
    return await this.http.get(`${this.linkRootApi}api/Details/ShowAllDetails`).toPromise().then((data: any) => {
      this.details = data.details;

      return this.details;
    });
  }
}