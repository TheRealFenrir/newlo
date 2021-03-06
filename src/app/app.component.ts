import { Component } from '@angular/core';
import { routerAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerAnimation]
})
export class AppComponent {
  title = 'elo-ui';
}
