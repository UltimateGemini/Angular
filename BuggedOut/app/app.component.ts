import {Component} from '@angular/core';
import {FirebaseConfigService} from "./core/service/firebase-config.service";

@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: [
            `
            .container {
                margin-top: 3rem;
            }
        `
    ]
})
export class AppComponent {

    constructor(private fbService: FirebaseConfigService) {

    }
}