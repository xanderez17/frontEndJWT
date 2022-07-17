import { Component, OnInit } from '@angular/core';
import {TokenService} from "../service/token.service";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {LoginUsuario} from "../models/login-usuario";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authService.login(this.loginUsuario).subscribe(data =>{
      this.isLogged = true;

      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
        this.toastr.success('Bienvenido '+ data.username, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      this.router.navigate(['/']);
    },
      err => {
      this.isLogged = false;
      this.errMsj = err.error.message;
        this.errMsj = err.error.mensaje;
        this.toastr.error(err.error.mensaje, 'Fallo en el Login', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      // console.log(err.error.message);
      }
    );
  }

}
