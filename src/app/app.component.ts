import { Component } from '@angular/core';
import { DataService } from './services/data.service'

@Component({
  selector: 'app-root',// selector property is not required anylonger
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'Material Library App';
}
