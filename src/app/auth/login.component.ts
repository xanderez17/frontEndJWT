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

  loginUsuario: LoginUsuario;
  username: string;
  password: string;
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data =>{
      this.tokenService.setToken(data.token);
      this.router.navigate(['/']);
    },
      err => {
      this.errMsj = err.error.message;
        this.errMsj = err.error.mensaje;
        this.toastr.error(err.error.mensaje, 'Fallo en el Login', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
