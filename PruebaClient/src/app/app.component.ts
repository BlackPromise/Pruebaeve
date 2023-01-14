import { Component } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { ResultModel } from './models/ResultModel';
import { TransaccionService } from './services/transaccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cliente';

  constructor(
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    public transaccion: TransaccionService
  ) {
    // customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.keyboard = false;
    config.scroll = true;
  }

  idUsuario: string | null = null;

  open(content: any) {
    this.offcanvasService.open(content);
  }

  close(content: any) {
    this.offcanvasService.dismiss(content);
  }

  onClose() {
    (document.getElementsByClassName('refresh')[0] as any).click();
    (document.getElementsByClassName('close-side')[0] as any).click();
    this.idUsuario = null;
  }

  onSelectUser(idUsuario: string) {
    this.idUsuario = idUsuario;
    (document.getElementsByClassName('open-side')[0] as any).click();
  }

  alert: any = {};

  ShowAlert(data: any) {
    if (data) {
      this.alert = { type: (data.error ? 'danger' : 'success'), message: data.msg };
      setTimeout(() => {
        this.alert = {};
      }, 10000);
    }
  }
}
