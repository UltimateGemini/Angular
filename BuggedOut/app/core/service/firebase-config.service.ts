import {Injectable} from "@angular/core";
import {FIREBASE_CONFIG} from "../constants";
import * as firebase from "firebase";
require('firebase/database');

@Injectable()
export class FirebaseConfigService {

    private database: firebase.database.Database;

    constructor() {
        this.configureApp();
        this.configDatabase();
    }

    configureApp() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    configDatabase () {
        this.database = firebase.database();
    }
}