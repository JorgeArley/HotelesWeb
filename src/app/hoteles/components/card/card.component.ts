import { Component, Input } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';

@Component({
  selector: 'hoteles-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input()
  public hotel!: Hotel;


  ngOnInit(): void {
    if ( !this.hotel ) throw Error('Hero property is required');
  }


}
