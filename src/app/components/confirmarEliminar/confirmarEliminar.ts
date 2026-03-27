import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogRef, MatDialogClose } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-confirmar-eliminar',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './confirmarEliminar.html',
  styleUrl: './confirmarEliminar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmarEliminar {

  dialog = inject(MatDialogRef)

  cancelar() {
    this.dialog.close(false)
  }

  eliminar() {
    this.dialog.close(true)
  }

}
