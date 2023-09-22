import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewHotelPageComponent } from './pages/new-hotel-page/new-hotel-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HotelPageComponent } from './pages/hotel-page/hotel-page.component';

//localhost:4200/hoteles/''
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hotel', component: NewHotelPageComponent},
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
