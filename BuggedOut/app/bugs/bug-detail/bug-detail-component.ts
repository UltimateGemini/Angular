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
    @Input() currentBug = new Bug (null, null, 1, 1, null, null, null, null);

    constructor(private formB: FormBuilder, private bugService: BugService) {

    }

    ngOnInit() {
        this.configureForm();
    }

    configureForm(bug?: Bug) {

        if (bug) {
            this.currentBug = new Bug(
                bug.id,
                bug.title,
                bug.status,
                bug.severity,
                bug.description,
                bug.createdBy,
                bug.createdDate,
                bug.updatedBy,
                bug.updatedDate
            );
        }

        this.bugForm = this.formB.group({
            title: [this.currentBug.title, [Validators.required, forbiddenStringValidator(/puppy/i)]],
            status: [this.currentBug.status, Validators.required],
            severity: [this.currentBug.severity, Validators.required],
            description: [this.currentBug.description, Validators.required]
        });
    }

    submitForm() {
        this.currentBug.title = this.bugForm.value["title"];
        this.currentBug.status = this.bugForm.value["status"];
        this.currentBug.severity = this.bugForm.value["severity"];
        this.currentBug.description = this.bugForm.value["description"];

        if (this.currentBug.id) {
           this.updateBug();
        } else {
            this.addBug();
        }

        this.refreshForm();
    }

    addBug() {
        this.bugService.addBug(this.currentBug);
        this.refreshForm();
    }

    updateBug() {
        this.bugService.updateBug(this.currentBug);
        this.refreshForm();
    }

    refreshForm() {
        this.bugForm.reset({status: 1, severity: 1});
        this.cleanBug();
    }

    cleanBug() {
        this.currentBug = new Bug(null, null, 1, 1, null, null, null, null);
    }
}