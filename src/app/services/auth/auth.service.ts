import { Injectable } from '@angular/core';
import { from, isObservable, Observable, of, tap } from 'rxjs';
import { UserData } from './../../interfaces/rpc'
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<UserData>;

  constructor(private serverSerivce$: ServerService) { }

  login(email: string = 'admin@npkcalc.com', password: string = '1') {
    console.log( this.serverSerivce$.serverAuthorizator$)
    this.serverSerivce$.serverAuthorizator$.pipe(
      tap(
        (authorizator) => this.user$ = authorizator ? from(authorizator.LogIn(email, password)) : of(null)
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

    if (isObservable(this.user$)) {
      this.user$.subscribe(
        {
          next: (v) => console.log('Authentification data: ', v),
          error: (e) => console.log('Authentification error:\n\n', e),
          complete: () => console.log('auth complete'),
        }
      )
    }

    console.log('auth service login done');

    return this.user$;
  }
}
