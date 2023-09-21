import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewHotelPageComponent } from './pages/new-hotel-page/new-hotel-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';



@NgModule({
  declarations: [
    HotelPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewHotelPageComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HotelesModule { }
