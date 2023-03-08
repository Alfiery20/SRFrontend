import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NuevoUsuario } from 'src/app/estructura/clases/usuario';
import { utils } from 'src/app/estructura/utils/utils';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formularioRegistro!: FormGroup;
  nuevoUsuario!: NuevoUsuario;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.nuevoUsuario = new NuevoUsuario();
  }

  ngOnInit() {
    this.cargarFormulario();
  }

  public registerUser() {
    var codigo = this.validarFormulario();
    if (codigo!['codigo'] != -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: codigo!['mensaje'].toString(),
      });
    } else {
      this.usuarioService.registerUser(this.nuevoUsuario).subscribe((data) => {
        if (data.codigo != 'OK') {
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

  private cargarFormulario() {
    this.formularioRegistro = this.formBuilder.group({
      numDocu: ['', Validators.required],
      nombres: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9#$&%._-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9.]{2,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.[a-z])(?=.[A-Z])(?=.d)(?=.[@$!%?&])[A-Za-zd@$!%?&]{8,}$'
          ),
        ],
      ],
      passwordValidate: ['', [Validators.required]],
    });
  }

  private validarFormulario() {
    var formulario = this.formularioRegistro.value;
    var codigo: Number = -1;
    var mensaje: String = '';
    //LLENADO DE FORMULARIO
    if (formulario.numDocu == '' || formulario.numDocu == null) {
      codigo = 1;
      mensaje = 'El numero de documento es Obligatorio';
      return { codigo, mensaje };
    }
    if (formulario.nombres == '' || formulario.nombres == null) {
      codigo = 2;
      mensaje = 'El nombre es Obligatorio';
      return { codigo, mensaje };
    }
    if (
      formulario.apellidoPaterno == '' ||
      formulario.apellidoPaterno == null
    ) {
      codigo = 3;
      mensaje = 'El apellido paterno es Obligatorio';
      return { codigo, mensaje };
    }
    if (
      formulario.apellidoMaterno == '' ||
      formulario.apellidoMaterno == null
    ) {
      codigo = 4;
      mensaje = 'El apellido materno es Obligatorio';
      return { codigo, mensaje };
    }
    if (formulario.correo == '' || formulario.correo == null) {
      codigo = 5;
      mensaje = 'El correo es Obligatorio';
      return { codigo, mensaje };
    }
    if (formulario.password == '' || formulario.password == null) {
      codigo = 6;
      mensaje = 'La clave es Obligatoria';
      return { codigo, mensaje };
    }
    if (
      formulario.passwordValidate == '' ||
      formulario.passwordValidate == null
    ) {
      codigo = 7;
      mensaje = 'La verificacion de clave es obligatoria';
      return { codigo, mensaje };
    }
    //VALIDACIONES ADICIONALES
    if (formulario.password != formulario.passwordValidate) {
      codigo = 8;
      mensaje = 'Las claves deben ser iguales';
      return { codigo, mensaje };
    }
    console.log({ codigo, mensaje });
    return { codigo, mensaje };
  }
}
