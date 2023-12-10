import { Injectable } from '@angular/core';
import {delay, Observable, of, switchMap, throwError} from "rxjs";
import {IMessageItem} from "../store/models/messages-model.interface";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  public getMessages(): Observable<IMessageItem[] | never> {
    return of([{
      id: 1,
      content: 'Hello World!'
    }]).pipe(
        delay(2000),
        // switchMap(
        //     () => throwError('BIM BIM BOM BOM SERVER UPAL')
        // ),
    )
  }
}
