import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Message } from '../models/message.models';
import { RobotChatService } from '../services/robot-message.service';

@Component({
  selector: 'robot-chat',
  templateUrl: './robot-chat.component.html',
  styleUrls: ['./robot-chat.component.scss'],
  animations: [
    trigger('new_message', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('100ms', [
          animate('.3s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(20px)', offset: 0}),
            style({opacity: 1, transform: 'translateY(-10px)', offset: 0.7}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class RobotChatComponent {

  static readonly CONTROL_CHARACTER_COUNT = 100;
  @Input() minimumAnswerDelay: number = 100;
  @Input() maximumAnswerDelay: number = 2000;

  @ViewChild("message_container", {read: ElementRef}) message_container: ElementRef;
  @ViewChild("message_input", {read: ElementRef}) message_input: ElementRef;
  messages: Message[] = []

  constructor(private robotService: RobotChatService) {
  }

  sendMessageToRobot(message: string) {
    if (!!message && message.length > 0) {
      this.disableMessageInput();
      this.addMessagePage(message.trim());
      setTimeout(() => {
        this.robotService.getResponse(message.trim()).subscribe(res => {
          this.addMessagePage(res.result.fulfillment.speech, false);
          this.enableMessageInput();
        });
      }, this.calculateDelay(message.trim()));
    }
  }

  private calculateDelay(message: string): number {
    let delay = message.length / RobotChatComponent.CONTROL_CHARACTER_COUNT * this.maximumAnswerDelay;
    delay = Math.max(Math.min(delay, this.maximumAnswerDelay), this.minimumAnswerDelay);
    return delay;
  }

  private enableMessageInput() {
    this.message_input.nativeElement.removeAttribute('disabled');
    this.message_input.nativeElement.value = '';
    this.message_input.nativeElement.focus();
  }

  private disableMessageInput() {
    this.message_input.nativeElement.setAttribute('disabled', 'true');
    this.message_input.nativeElement.blur();
  }

  private addMessagePage(text: string, user: boolean = true) {
    this.messages.push(new Message(user ? 'You' : 'Sam',  text, new Date(), user));
    this.scrollMessageContainer();
  }

  private scrollMessageContainer() {
    const element = this.message_container.nativeElement as HTMLElement;
    const interval = setInterval(() => {
      const currentPos = element.offsetHeight+element.scrollTop;
      if (currentPos < (element.scrollHeight-15)) {
        element.scrollTop += Math.round((element.scrollHeight - currentPos) / 10);
      } else {
        element.scrollTop = element.scrollHeight;
        clearInterval(interval);
      }
    }, 10);
  }
}
