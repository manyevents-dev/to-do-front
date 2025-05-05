import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  imports: [
    FormComponent,
    TasksComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
