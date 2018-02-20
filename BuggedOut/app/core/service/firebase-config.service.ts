import {Injectable} from "@angular/core";
import {FIREBASE_CONFIG} from "../constants";
import * as firebase from "firebase";


@Injectable()
export class FirebaseConfigService {
    constructor() {
        this.configureApp();
    }

    configureApp() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }
}