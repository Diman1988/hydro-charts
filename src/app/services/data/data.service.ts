import { Injectable } from '@angular/core';
import { Vector_Direct2 } from 'nprpc/nprpc/flat';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import * as npkcalc from 'src/app/interfaces/rpc';
import * as NPRPC from 'nprpc/nprpc';
import { ServerService } from '../server/server.service';
import { ref } from 'nprpc/nprpc';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private calculator = new npkcalc.Calculator(
    {
      port: 0,
      object_id: 0n,
      poa_idx: 0,
      ip4: 0x7F000001,
      websocket_port: 33252,
      flags: 0,
      class_id: "",
    }
  );

  private get_image(type: string, abuf: ArrayBuffer) {
    return URL.createObjectURL(new Blob([abuf], {type: type}));
  }

	private get_image_svg(abuf: ArrayBuffer) : string {
		return this.get_image('image/svg+xml', abuf);
	}

  private readonly ref = NPRPC.make_ref<NPRPC.Flat.Vector_Direct2<npkcalc.Flat_npkcalc.Media_Direct>>();

  private readonly commonimages = from(this.calculator.GetImages(this.ref));

  public svg$ = new BehaviorSubject<string[]>([]);

  public svgObs$ = this.svg$.asObservable();

  constructor(private serverService$: ServerService) {
    this.commonimages
      .subscribe(() => {
        const svgArray: Array<string> = [];

        console.log('Get images to ref data')
        this.svgObs$.subscribe(
          {
            next: () => Array.from(this.ref.value)
                          .forEach(svg => svgArray.push(this.get_image_svg(svg.data_vd().array_buffer))),
            error: (e) => console.log(e),
          }
        )

        this.svg$.next(svgArray);
      });
    }

  public getSvg() {
    console.log("just a method");
  }
}
