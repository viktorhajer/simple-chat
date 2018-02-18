import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RobotChatModule } from './robot-chat/robot-chat.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, RobotChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
