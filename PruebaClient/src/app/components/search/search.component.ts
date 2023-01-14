import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResultModel } from 'src/app/models/ResultModel';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  Usuarios: UsuarioModel[] = [];
  @Output() showAlert: EventEmitter<any> = new EventEmitter<any>();

  @Output() onSelectUser: EventEmitter<string> = new EventEmitter<string>();

  constructor(public transaccion: TransaccionService) { }

  ngOnInit(): void {
    this.ConsultarUsuarios();
  }

  ConsultarUsuarios() {
    this.Usuarios = [];
    this.transaccion.ConsultarTodos().subscribe((result: ResultModel) => {
      if ((result.Error || '').length <= 0) {
        this.Usuarios = result.Data;
      } else {
        this.showAlert.emit({ error: true, msg: result.Error });
      }
    }, (error) => {
      this.showAlert.emit({ error: true, msg: error });
    })
  }

  EditarUsuario(idUsuario: string) {
    this.onSelectUser.emit(idUsuario);
  }
  EliminarUsuario(idUsuario: string) {
    this.transaccion.Eliminar(idUsuario).subscribe((result: ResultModel) => {

      if ((result.Error || '').length <= 0) {
        this.ConsultarUsuarios();
        this.showAlert.emit({ error: false, msg: 'Registro eliminado' });
      }
      else {
        this.showAlert.emit({ error: true, msg: result.Error });
      }
    }, (error) => {
      console.log(error);
      this.showAlert.emit({ error: true, msg: error });
    })
  }
}
