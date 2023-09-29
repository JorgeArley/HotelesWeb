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

  @Input()
  public role?: string | null;


  ngOnInit(): void {
    if ( !this.hotel ) throw Error('Hotel property is required');
  }


}
