import { NotificationService } from './../../services/notification/notification.service';
import { UserServiceService } from './../../services/userService/user-service.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwtDecode   from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  success:boolean=false;
  emailLogin: FormGroup = new FormGroup({});
  emailSignUp: FormGroup = new FormGroup({});
  myScriptElement: HTMLScriptElement;


  constructor(     private fb: FormBuilder,
                    private authService:AuthService,
                    private _userService:UserServiceService,
                    private router:Router,
                    private _notification:NotificationService
    ) {  
      this.myScriptElement = document.createElement('script');
      this.myScriptElement.src = '../../../assets/js/main.js';
      document.body.appendChild(this.myScriptElement)
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.emailLogin = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: [null, [Validators.required]],
    });
    this.emailSignUp = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: [null, [Validators.required]],
      userType: ['', [Validators.required]],
    });


  }


  signUpViaEmail():void{
    
    this.authService.signUpViaEmail(this.emailSignUp.value).subscribe((x: any) => {
      if (x.success && x.data) {
        this.success=true;
        this.initializeForm();
        setTimeout(()=>{
          this.success=false;
        },3000)
      }
    })
  }

  loginViaEmail(): void {
    this.authService.login(this.emailLogin.value).subscribe((x: any) => {
      if (x.success && x.data) {
        this.setUserDetails(x);
      }
    })
  }
  

  setUserDetails(response: any) {
    localStorage.setItem("access_token", response.data.accessToken);

    let user:any = jwtDecode(response.data.accessToken);
    this._userService.email = user.email;
    this._userService.legalName = user.name;
    this._userService.userID = user.id;
    this._userService.isCreator = user.isCreator==0 ? false:true

    this.router.navigate(['dashboard']);

  }


}
