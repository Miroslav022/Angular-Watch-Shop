import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification-component.component.html',
  styleUrl: './notification-component.component.css',
})
export class NotificationComponentComponent {
  @Input() message: string | null = null;
  @Input() notificationClass: string = 'notification';
}
