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

    addBug(bug: Bug) {
        const newBugRef = this.bugsDbRef.push();
        newBugRef.set({
                title: bug.title,
                status: bug.status,
                severity: bug.severity,
                description: bug.description,
                createdBy: 'John Doe',
                createdDate: Date.now()
            }).catch(err => console.error("Unable to add bug to Firebase - ", err));
    }

}