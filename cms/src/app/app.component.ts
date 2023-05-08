import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   selectedFeature = 'documents';
  //selectedFeature: selectedFeature = '';
  /*selectedFeature2 = 'messages';
  selectedFeature3 = 'contacts';*/
  title = 'cms';

  constructor() { }

    switchView(selectedFeature: string){
    this.selectedFeature = selectedFeature;
  }
}
