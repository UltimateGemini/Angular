import {Injectable} from "@angular/core";
import {FirebaseConfigService} from "../../core/service/firebase-config.service";
import {Observable} from "rxjs/Observable";
import {Bug} from "../model/bug";


@Injectable()
export class BugService {

    private bugsDbRef = this.fbService.database.ref('/bugs');

    constructor(private fbService: FirebaseConfigService) {

    }

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_added', bug => {
                    const newBug = bug.val() as Bug;
                    obs.next(newBug);
                },
                err => {
                    obs.throw(err);
                });
        });
    }


}