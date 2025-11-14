import { Component } from '@angular/core';
import { Task } from '../../components/task/task';


@Component({
  selector: 'app-dashboard',
  imports: [Task],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class DashboardComponent {

}
