import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './components/message.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RobotChatService } from './services/robot-message.service';
import { HttpModule } from '@angular/http';
import { RobotChatComponent } from './components/robot-chat.component';
import { TypingComponent } from './components/typing.component';

@NgModule({
  imports: [
    CommonModule, BrowserModule, BrowserAnimationsModule, HttpModule
  ],
  declarations: [MessageComponent, RobotChatComponent, TypingComponent],
  providers: [RobotChatService],
  exports: [RobotChatComponent]
})
export class RobotChatModule { }
