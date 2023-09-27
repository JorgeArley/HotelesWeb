import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewHotelPageComponent } from './pages/new-hotel-page/new-hotel-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HotelesRoutingModule } from './hoteles-routing.module';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NewRoomComponent } from './pages/new-room/new-room.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { NewReserveComponent } from './pages/new-reserve/new-reserve.component';



@NgModule({
  declarations: [
    HotelPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewHotelPageComponent,
    SearchPageComponent,
    CardComponent,
    ConfirmDialogComponent,
    NewRoomComponent,
    NewBookingComponent,
    NewReserveComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HotelesRoutingModule,
    MaterialModule
  ]
})
export class HotelesModule { }
