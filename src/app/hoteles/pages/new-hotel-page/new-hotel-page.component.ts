import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelesService } from '../../services/hoteles.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Hotel } from '../../interfaces/hotel.interface';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-hotel-page',
  templateUrl: './new-hotel-page.component.html',
  styleUrls: ['./new-hotel-page.component.css']
})
export class NewHotelPageComponent {

  public hotelForm = new FormGroup({
    id: new FormControl(''),
    cantidad_habitaciones: new FormControl(''),
    direccion: new FormControl<string>(''),
    imagen: new FormControl(''),
    nombre: new FormControl(''),
    numero_estrellas: new FormControl(''),
    pais: new FormControl(''),
  });

  constructor(
    private hotelesService: HotelesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  get currentHotel(): Hotel {
    const hotel = this.hotelForm.value as Hotel;
    return hotel;
  }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.hotelesService.getHotelById(id)),
      ).subscribe((hotel:any) => {
        if (!hotel) {
          return this.router.navigateByUrl('/');
        }

        this.hotelForm.reset(hotel.hotel);
        return;
      });

  }

  onSubmit(): void {

    if (this.hotelForm.invalid) return;

    if (this.currentHotel.id) {
      this.hotelesService.updateHotel(this.currentHotel)
        .subscribe(hotel => {
          this.showSnackbar(`${hotel.nombre} actualizado!`);
        });

      return;
    }

    this.hotelesService.addHotel(this.currentHotel)
      .subscribe((resp:any) => {
        this.router.navigate(['/hoteles/edit', resp.hotel.id]);
        this.showSnackbar(`${resp.hotel.nombre} creado!`);
      });
  }

  onDeleteHotel() {
    if (!this.currentHotel.id) throw Error('Hotel id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.hotelForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.hotelesService.deleteHotelById(this.currentHotel.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => {
        this.router.navigate(['/hoteles']);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }

}
