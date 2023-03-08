import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from '../estructura/clases/constants';
import { NuevoUsuario } from '../estructura/clases/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}
  registerUser(nuevoUsuario: NuevoUsuario): Observable<any> {
    let json = JSON.stringify(nuevoUsuario);
    let params = json;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<NuevoUsuario>(
      constants.URL_API + '/api/Usuario/register',
      params,
      {
        headers: headers,
      }
    );
  }
}
