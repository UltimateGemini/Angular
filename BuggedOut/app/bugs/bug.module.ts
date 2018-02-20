import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {BugListComponent} from "./bug-list/bug-list.component";
import {BugRoutingModule} from "./bug-routing.module";
import {BugService} from "./service/bug.service";
import {BugDetailComponent} from "./bug-detail/bug-detail-component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        BugRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        BugListComponent,
        BugDetailComponent
    ],
    exports: [],
    providers: [
        BugService
    ]
})

export class BugModule {
}
