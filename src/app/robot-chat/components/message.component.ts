import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '../models/message.models';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: Message;
  @Input() speed: number;
}
