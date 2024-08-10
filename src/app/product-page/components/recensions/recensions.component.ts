import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RecensionsService } from '../../business-logic/Api/recensions.service';

@Component({
  selector: 'app-recensions',
  templateUrl: './recensions.component.html',
  styleUrl: './recensions.component.css',
})
export class RecensionsComponent {
  @Input() recension: any;
  @Input() creator: string;
  @Output() recensionDeleted: EventEmitter<boolean> = new EventEmitter(false);
  constructor(private recensionService: RecensionsService) {}

  deleteRecension(): void {
    this.recensionService.deleteRecension(this.recension.id);
    this.recensionDeleted.emit(true);
  }
}
