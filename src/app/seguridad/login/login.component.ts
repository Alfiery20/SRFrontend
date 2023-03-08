import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioValidate } from 'src/app/estructura/clases/usuario';
import { utils } from 'src/app/estructura/utils/utils';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formularioLogin!: FormGroup;
  usuarioValidate!: UsuarioValidate;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formularioLogin = this.formBuilder.group({
      correo: [
        'alfieryfurlon18@gmail.com',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9#$&%._-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9.]{2,}$'
          ),
        ],
      ],
      password: ['123456', [Validators.required]],
    });
  }

  inicioSersion() {
    var usuario = new UsuarioValidate();
    usuario.correoElectronico = this.formularioLogin.value.correo;
    usuario.clave = this.formularioLogin.value.password;
    this.login(usuario);
  }

  private login(usuarioValidate: UsuarioValidate) {
    this.loginService.signUp(usuarioValidate).subscribe((data) => {
      console.log(data);

      if (data.codigo != '1') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: utils.convertirTexto(data.descripcion),
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Felicidades',
          text: utils.convertirTexto(data.descripcion),
        });
      }
    });
  }
}
