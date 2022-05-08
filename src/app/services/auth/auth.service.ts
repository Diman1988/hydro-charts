import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject, Subscriber, tap } from 'rxjs';
import * as npkcalc from './../../interfaces/rpc'
import * as NPRPC from 'nprpc/nprpc';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth$: Observable<npkcalc.UserData>;

  constructor(private serverSerivce$: ServerService) {
    serverSerivce$.updateConfig(
      new npkcalc.Authorizator(
        {
          port: 0,
          object_id: 1n,
          poa_idx: 0,
          ip4: 0x7F000001,
          websocket_port: 33252,
          flags: 0,
          class_id: "",
        }
      )
    )
  }

  login(email: string = 'admin@npkcalc.com', password: string = '1') {
    console.log('service');

    this.serverSerivce$.server$.pipe(
      tap(
        (server) => this.auth$ = from(server.LogIn(email, password))
      ),
      tap(() => console.log("login"))
    ).
    subscribe(
      {
        next: (server) => console.log('server config:', server),
        error: (error) => console.log('server error:', error),
        complete: () => console.log("server complete"),
      }
    );

    this.auth$.subscribe(
      {
        next: (v) => console.log('Authentification data: ', v),
        error: (e) => console.log('Authentification error:\n\n', e),
        complete: () => console.log('auth complete'),
      }
    )

    console.log('service done');

    return this.auth$;
  }
}
