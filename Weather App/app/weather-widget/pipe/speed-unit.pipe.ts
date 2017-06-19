/**
 * Created by noelfranceschi on 6/17/17.
 */

import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'speedUnit'
})

export class SpeedUnitPipe implements PipeTransform {

    transform(speed: number, unitType: string) {
        switch (unitType) {
            case 'mph':
                const miles = Number(speed * 1.6).toFixed(0);
                return miles + 'mph';

            default:
                Number(speed).toFixed(0);
                return speed + 'mph';
        }
    }
}