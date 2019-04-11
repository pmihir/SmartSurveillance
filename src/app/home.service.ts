import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';   
import  'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  dataList : AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase,private http:HttpClient) { }

  getData(){
    this.dataList=this.firebase.list('Automation');
    console.log("in get data",this.dataList)
    return this.dataList;
  }

  updateLight(valueChanged){
    console.log(valueChanged);
    this.dataList.update('testhome',
      {
        Fan:valueChanged
      })
  }

  getImageData(){
    console.log("request send")
    return this.http.get("http://localhost:3000/api/getData")
  }
}
