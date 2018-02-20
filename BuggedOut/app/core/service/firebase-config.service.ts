import {Injectable} from "@angular/core";
import {FIREBASE_CONFIG} from "../constants";
import * as firebase from "firebase";
require('firebase/database');

@Injectable()
export class FirebaseConfigService {

    private _database: firebase.database.Database;

    constructor() {
        this.configureApp();
        this.configDatabase();
    }

    public get database () {
        return this._database;
    }

    configureApp() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    configDatabase () {
        this._database = firebase.database();
    }
}