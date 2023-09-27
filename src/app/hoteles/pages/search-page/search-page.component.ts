import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HotelesService } from '../../services/hoteles.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public reservas: any[] = [];
  public selectedHotel?: Hotel;

  constructor( private hotelesService: HotelesService ){}

  

  searchHotel() {
    const value: string = this.searchInput.value || '';
    if (!value) { return }

    this.hotelesService.getSuggestions( value )
    .subscribe( (resp: any) => {
      this.reservas = resp.reservas} )    
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedHotel = undefined;
      return;
    }

    const hotel: Hotel = event.option.value;
    this.searchInput.setValue( hotel.nombre );

    this.selectedHotel = hotel;

  }


}