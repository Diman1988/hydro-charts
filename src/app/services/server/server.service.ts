import { APP_INITIALIZER, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import * as npkcalc from './../../interfaces/rpc'
import * as NPRPC from 'nprpc';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  public rpc: NPRPC.Rpc;

  private readonly serverAuthorizatorSubject$ = new BehaviorSubject<npkcalc.Authorizator>(null);

  public serverAuthorizator$ = this.serverAuthorizatorSubject$
    .asObservable()
    .pipe(
      filter(user => user !== null),
      distinctUntilChanged()
    );

  constructor() {}

  public rpcInit(): Promise<void | NPRPC.Rpc> {
    console.warn('Server service: NPC Inited');

    return NPRPC.init()
            .then(rpc => {
              this.rpc = rpc;
              console.log(rpc.host_info.objects.authorizator)
              this.updateConfig(rpc.host_info.objects.authorizator);
            });
  }

  public updateConfig(config: npkcalc.Authorizator): Observable<npkcalc.Authorizator> {
    console.log('server config update');
    this.serverAuthorizatorSubject$.next(config);
    this.serverAuthorizator$.subscribe(
      {
        next: (v) => console.log('new server config:\n', v),
      }
    )

    return this.serverAuthorizator$;
  }
}
