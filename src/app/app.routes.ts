import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'tasks', component: TasksComponent }
];
