import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo, TaskStatus } from '../services/todo.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;
  error = '';
  TaskStatus = TaskStatus;
  isEditing: number | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  get sortedTodos() {
    return [...this.todos].sort((a, b) => {
      return (b.id || 0) - (a.id || 0);
    });
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des tâches';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  updateStatus(todo: Todo) {
    this.todoService.updateStatus(todo.id!, todo.status).subscribe({
      next: () => {
        this.error = '';
        this.loadTodos();
      },
      error: (err) => {
        this.error = 'La tache a été terminer et est non modifiable';
        console.error('Erreur:', err);
        this.loadTodos();
      }
    });
  }

  deleteTodo(id: number) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.loadTodos();
          this.error = '';
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression de la tâche';
          console.error('Erreur:', err);
        }
      });
  }

  updateTitle(todo: Todo) {
    if (todo.title.trim()) {
      this.todoService.updateTodo(todo.id!, todo).subscribe({
        next: () => {
          this.error = '';
          this.isEditing = null;
        },
        error: (err) => {
          this.error = 'Erreur lors de la modification du titre';
          console.error('Erreur:', err);
          this.loadTodos(); // Recharger en cas d'erreur
        }
      });
    }
  }
}
