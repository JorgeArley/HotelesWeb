import { Component } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { HotelesService } from '../../services/hoteles.service'

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent {
  public hoteles: Hotel[] = [];

  constructor ( private hotelesService: HotelesService){}

  ngOnInit(): void {
    this.hotelesService.getHoteles()
      .subscribe( hoteles => {
        this.hoteles = hoteles
        console.log(hoteles);
      });
  }
}
