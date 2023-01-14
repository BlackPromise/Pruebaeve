import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoCivilModel } from '../models/EstadoCivilModel';
import { ResultModel } from '../models/ResultModel';
import { UsuarioModel } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private http: HttpClient) { }

  Guardar(usuario: UsuarioModel): Observable<ResultModel> {
    return this.http.post<ResultModel>(environment.baseUrl + '/Transaccion/Guardar', usuario);
  }

  Actualizar(usuario: UsuarioModel): Observable<ResultModel> {
    return this.http.put<ResultModel>(environment.baseUrl + '/Transaccion/Actualizar', usuario);
  }

  Eliminar(idUsuario: string): Observable<ResultModel> {
    return this.http.delete<ResultModel>(environment.baseUrl + '/Transaccion/Eliminar?idUsuario=' + idUsuario);
  }

  ConsultarTodos(): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.baseUrl + '/Transaccion/ConsultarTodos');
  }

  ConsutlarUno(idUsuario: string): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.baseUrl + '/Transaccion/ConsultarUno?idUsuario=' + idUsuario);
  }

  private ObtenerEstadosCiviles(): Observable<ResultModel> {
    return this.http.get<ResultModel>(environment.baseUrl + '/Transaccion/EstadosCiviles');
  }

  private EstadosCivilesInfo: any = {
    enProceso: false,
    data: []
  }

  get EstadosCiviles() {
    if (this.EstadosCivilesInfo.data.length <= 0) {
      if (!this.EstadosCivilesInfo.enProceso) {
        this.EstadosCivilesInfo.enProceso = true;
        this.ObtenerEstadosCiviles().subscribe((result: ResultModel) => {
          if ((result.Error || '').length <= 0) {
            this.EstadosCivilesInfo.data = result.Data as EstadoCivilModel[];
          }
          else {
            console.log(result.Error);
          }
        }, (error) => {
          console.log('Error', error);
        })
      }
    }
    return this.EstadosCivilesInfo.data;
  }

  EstadoCivil(id: string): string {
    if (this.EstadosCiviles.length > 0) {
      const estadoCivil = this.EstadosCiviles.find((x: EstadoCivilModel) => x.IdEstadoCivil == id);
      if (estadoCivil) {
        return estadoCivil.Nombre;
      }
    }
    return '';
  }

  CargarImagen(idUsuario:string,imagen:any) :Observable<ResultModel>{
    const formData = new FormData();
    formData.append('file', imagen, imagen.name);
    return this.http.post<ResultModel>(environment.baseUrl + '/Transaccion/CargarImagen?idUsuario=' + idUsuario, formData);
  }
  
}
