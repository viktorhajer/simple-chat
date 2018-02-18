
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RobotChatService {

  private token: string = 'b0e30c101e3049aa9591face506332de';
  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  constructor(private http: Http){}

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'en',
      sessionId: '12345'
    }
    return this.http
      .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .map(res => {
        return res.json()
      })
  }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}