/**
 * Created by noelfranceschi on 6/15/17.
 */

export class Weather {

    constructor (
        public temp: number,
        public summary: string,
        public wind: number,
        public humidity: number,
        public icon: string
    ) {}
}