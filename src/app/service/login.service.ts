import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioValidate } from '../estructura/clases/usuario';
import { constants } from '../estructura/clases/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  signUp(userLogin: UsuarioValidate): Observable<any> {
    let json = JSON.stringify(userLogin);
    let params = json;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<UsuarioValidate>(
      constants.URL_API + '/api/Usuario/validarUser',
      params,
      {
        headers: headers,
      }
    );
  }
}
