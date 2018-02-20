import {Injectable} from "@angular/core";
import {FirebaseConfigService} from "../../core/service/firebase-config.service";
import {Observable} from "rxjs/Observable";


@Injectable()
export class BugService {

    private bugsDbRef = this.fbSevice.database.ref('/bugs');

    constructor(private fbSevice: FirebaseConfigService) {

    }

    getAddedBugs(): Observable<any> {
        return Observable.create(obs => {
            this.bugsDbRef.on('child_added', bug => {
                    obs.next(bug.val());
                },
                err => {
                    obs.throw(err);
                });
        });
    }


}