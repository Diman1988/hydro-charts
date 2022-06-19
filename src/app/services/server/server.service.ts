import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Authorizator } from './../../interfaces/rpc'
import { Rpc, init } from 'nprpc';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  public rpc: Rpc | null = null;

  private readonly serverAuthorizatorSubject$ = new BehaviorSubject<Authorizator>(new Authorizator());

  public serverAuthorizator$ = this.serverAuthorizatorSubject$
    .asObservable()
    .pipe(
      filter(user => user !== null),
      distinctUntilChanged()
    );

  constructor() {}

  public rpcInit(): Promise<void | Rpc> {
    console.warn('Server service: NPC Inited');

    return init()
            .then(rpc => {
              this.rpc = rpc;
              console.log(rpc.host_info.objects.authorizator)
              this.updateConfig(rpc.host_info.objects.authorizator);
            });
  }

  public updateConfig(config: Authorizator): Observable<Authorizator> {
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
