import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forbiddenStringValidator} from "../../shared/validation/forbidden-string.validator";
import {BugService} from "../service/bug.service";
import {Bug} from "../model/bug";


@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: ['bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {

    private modalId = "bugModal";
    private bugForm: FormGroup;
    @Input() currentBug = new Bug (null, null, null, null, null, null, null, null);

    constructor(private formB: FormBuilder, private bugService: BugService) {

    }

    ngOnInit() {
        this.configureForm();
    }

    configureForm() {
        this.bugForm = this.formB.group({
            title: [null, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [1, Validators.required],
            severity: [1, Validators.required],
            description: [null, Validators.required]
        });
    }

    submitForm() {
        this.addBug();
    }

    addBug() {
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];
        this.bugService.addBug(this.currentBug);
    }
}