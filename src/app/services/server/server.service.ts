import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as npkcalc from './../../interfaces/rpc'
import * as NPRPC from 'nprpc/nprpc';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private rpc: NPRPC.Rpc;

  private readonly serverSubject$ = new BehaviorSubject<npkcalc.Authorizator>(
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
  );

  public server$ = this.serverSubject$.asObservable();

  constructor() {
    this.rpc = NPRPC.init();
    console.warn('Server service: NPC Inited');
  }

  public updateConfig(config: npkcalc.Authorizator): Observable<npkcalc.Authorizator> {
    console.log('server config update');
    this.serverSubject$.next(config);
    this.server$.subscribe(
      {
        next: (v) => console.log('new server config:\n', v),
      }
    )

    return this.server$;
  }
}
