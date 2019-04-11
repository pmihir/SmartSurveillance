import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  errorMessage:string;

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  verify(){
    if(this.username=="admin" && this.password=="admin"){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.errorMessage="Invalid Username OR Password";
    }
  }

}
