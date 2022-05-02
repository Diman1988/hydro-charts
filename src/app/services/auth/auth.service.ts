import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import * as npkcalc from './../../interfaces/rpc'
import * as NPRPC from 'nprpc/nprpc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private server = new npkcalc.Authorizator();

  private rpc: NPRPC.Rpc;

  constructor() {
    this.rpc = NPRPC.init();
  }

  checkAuth() {
    this.server.data.port = 0
    this.server.data.object_id = 1n
    this.server.data.poa_idx = 0
    this.server.data.ip4 = 0x7F000001
    this.server.data.websocket_port = 33252

    console.log('service');
    const auth$ = from(this.server.LogIn('admin@npkcalc.com', '1'))

    auth$.subscribe({
      next: value => console.log(value),
      error: error => console.log(error),
    })
    console.log('service done');
  }
}
