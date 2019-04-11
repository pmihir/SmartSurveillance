import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fanButton:string="OFF";
  lightButton:string="OFF";
  alarmButton:string="OFF";
  safeURL:any;
  data:any;
  successData:any;
  selectedFile: File = null;
  fd = new FormData();

  
  videoUrl="http://10.174.72.128:8080/browserfs.html";
  constructor(private homeservice:HomeService,private _sanitizer:DomSanitizer,private http: HttpClient) {
    this.safeURL=this._sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
     this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        }
   }

  ngOnInit() {
      var x= this.homeservice.getData();
      x.snapshotChanges().subscribe(
        (success)=>{
          console.log(success);
        }
      );
      this.homeservice.getImageData().subscribe(success=>{
      this.successData=success;
          console.log(success);
        },
      (fail)=>{
          console.log(fail);
  });

  }

  changeFanButton(){
    let value;
    this.fanButton=this.fanButton=="OFF"?"ON":"OFF";

    if(this.fanButton=="ON"){
      value="1";
    }
    else{
      value="0";
    }
    this.homeservice.updateLight(value);
    // if(this.button=="OFF"){
    //   this.button="ON";
    // }
    // else{
    //   this.button="OFF";
    // }
  }
  changeLightButton(){
    this.lightButton=this.lightButton=="OFF"?"ON":"OFF";
    this.homeservice.updateLight(this.lightButton);
  }
  changeAlarmButton(){
    this.alarmButton=this.alarmButton=="OFF"?"ON":"OFF";
    this.homeservice.updateLight(this.alarmButton);
  }

//   fileChange(event) {
//     let fileList: FileList = event.target.files;
//     if(fileList.length > 0) {
//         let file: File = fileList[0];
//         let formData:FormData = new FormData();
//         formData.append('uploadFile', file, file.name);
//         let headers = new Headers();
//         /** In Angular 5, including the header Content-Type can invalidate your request */
//         headers.append('Content-Type', 'multipart/form-data');
//         headers.append('Accept', 'application/json');
//         let options = new RequestOptions({ headers: headers });
//         this.http.post(`${this.apiEndPoint}`, formData, options)
//             .map(res => res.json())
//             .catch(error => Observable.throw(error))
//             .subscribe(
//                 data => console.log('success'),
//                 error => console.log(error)
//             )
//     }
// }

    createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  upload() {
    console.log(this.fd);
    this.http.post("http://localhost:3000/api/image", this.fd)
    .subscribe( result => {
      console.log(result)
    });
  }


}

