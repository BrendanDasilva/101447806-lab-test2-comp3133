import { Component } from '@angular/core';
import { MissionlistComponent } from './components/missionlist/missionlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MissionlistComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'labtest2';
}
