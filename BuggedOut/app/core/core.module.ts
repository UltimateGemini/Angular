import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {FirebaseConfigService} from "./service/firebase-config.service";


@NgModule({
    imports: [],
    declarations: [],
    exports: []
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                "CoreModule exist already... Only import in the root/appModule..."
            );
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                FirebaseConfigService
            ]
        };
    }
}