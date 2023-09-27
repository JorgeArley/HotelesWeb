import { Component } from '@angular/core';
import { HotelesService } from '../../services/hoteles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hotel } from '../../interfaces/hotel.interface';

@Component({
  selector: 'app-hotel-page',
  templateUrl: './hotel-page.component.html',
  styleUrls: ['./hotel-page.component.css']
})
export class HotelPageComponent {

  public hotel?: Hotel;

  constructor( private hotelesService: HotelesService,
              private activateRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap( ({ id }) => this.hotelesService.getHotelById( id )),
      )
      .subscribe( (resp: any) => {
        if ( !resp ) return this.router.navigate([ '/hoteles/list' ]);
        this.hotel = resp.hotel;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('hoteles/list')
  }
  

}
