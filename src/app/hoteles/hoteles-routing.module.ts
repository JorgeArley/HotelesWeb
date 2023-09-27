import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewHotelPageComponent } from './pages/new-hotel-page/new-hotel-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';
import { NewRoomComponent } from './pages/new-room/new-room.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { NewReserveComponent } from './pages/new-reserve/new-reserve.component';

//localhost:4200/hoteles/''
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hotel', component: NewHotelPageComponent},
      { path: 'new-room', component: NewRoomComponent},
      { path: 'new-booking', component: NewBookingComponent},
      { path: 'new-reserve/:idHotel/:idRoom', component: NewReserveComponent},
      { path: 'edit-room/:id', component: NewRoomComponent},
      { path: 'search', component: SearchPageComponent},
      { path: 'edit/:id', component: NewHotelPageComponent},
      { path: 'list', component: ListPageComponent},
      { path: ':id', component: HotelPageComponent},
      { path: '**', redirectTo: 'list'},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelesRoutingModule { }
