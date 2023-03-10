import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultModel } from 'src/app/models/ResultModel';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() set idUsuario(value: string | null) {
    this.form.reset({TieneHermanos:false});
    if (value) {
      this.SearchUser(value);
    }
  }

  SearchUser(idUsuario: string) {
    this.transaccion.ConsutlarUno(idUsuario).subscribe((result: ResultModel) => {
      if ((result.Error || '').length <= 0) {
        result.Data.FechaNacimientoValue = this.formatDateRevert(result.Data.FechaNacimiento);
        if ((result.Data.Imagen || '').length > 0) {
          this.ImagenOld = result.Data.Imagen;
        }
        this.form.reset(result.Data);
      }
    });
  }

  @Output() onClose: EventEmitter<null> = new EventEmitter<null>();
  @Output() showAlert: EventEmitter<any> = new EventEmitter<any>();

  Salir() {
    this.onClose.emit();
  }

  form: FormGroup = new FormGroup({
    IdUsuario: new FormControl(''),
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    Apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    FechaNacimientoValue: new FormControl('', [Validators.required]),
    TieneHermanos: new FormControl(false),
    IdEstadoCivil: new FormControl(null, [Validators.required])
  });

  constructor(public transaccion: TransaccionService) { }

  ngOnInit(): void {
  }

  formatDate(value: any) {
    var month = value.month < 10 ? '0' + value.month : value.month;
    var day = value.day < 10 ? '0' + value.day : value.day;
    return value.year + '-' + month + '-' + day + 'T00:00:00.004Z'
  }

  formatDateRevert(value: any) {
    var returnValue = {
      year: parseInt(value.substring(0, 4)),
      month: parseInt(value.substring(5, 7)),
      day: parseInt(value.substring(8, 10))
    }
    return returnValue;
  }

  ImagenOld: string = 'data:image/png;base64,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';

  SaveOrUpdate() {
    if (this.form.valid) {
      const method = (this.form.value.IdUsuario || '').length <= 0 ? 'Guardar' : 'Actualizar';
      var data = Object.assign({TieneHermanos:false},this.form.value);
      data.FechaNacimiento = this.formatDate(data.FechaNacimientoValue);
      data.IdUsuario = (data.IdUsuario || '').length <= 0 ? uuidv4() : data.IdUsuario;
      this.transaccion[method](data).subscribe((result: ResultModel) => {
        if ((result.Error || '').length <= 0) {
          if (this.Imagen) {
            this.transaccion.CargarImagen(result.Data, this.Imagen).subscribe((res: ResultModel) => {
              this.showAlert.emit({ error: false, msg: 'Datos guardados' });
              this.Salir();
            });
          } else {
            this.showAlert.emit({ error: false, msg: 'Datos guardados' });
            this.Salir();
          }
        } else {
          this.showAlert.emit({ error: true, msg: result.Error });
        }
      }, (error) => {
        this.showAlert.emit({ error: true, msg: error });
      });
    } else {
      this.showAlert.emit({ error: true, msg: 'Diligencie los campos' });
    }
  }

  Imagen: any = null;

  CargarImagen(files: any) {
    this.Imagen = null;
    if (files) {
      if (files.length > 0) {
        this.Imagen = files[0];
      }
    }
  }

}
