import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forbiddenStringValidator} from "../../shared/validation/forbidden-string.validator";
import {BugService} from "../service/bug.service";
import {Bug} from "../model/bug";
import {SEVERITY, STATUS} from "../../shared/constant/constants";


@Component({
    moduleId: module.id,
    selector: 'bug-detail',
    templateUrl: 'bug-detail.component.html',
    styleUrls: ['bug-detail.component.css']
})
export class BugDetailComponent implements OnInit {

    private modalId = "bugModal";
    private bugForm: FormGroup;

    private statuses = STATUS;
    private severites = SEVERITY;

    private statusArr: string[] =[];
    private severityArr: string[] =[];


    @Input() currentBug = new Bug (null, null, this.statuses.Logged, this.severites.Severe, null, null, null, null);

    constructor(private formB: FormBuilder, private bugService: BugService) {

    }

    ngOnInit() {
        this.statusArr = Object.keys(this.statuses).filter(Number);
        this.severityArr = Object.keys(this.severites).filter(Number);
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
        this.bugForm.reset({status: this.statuses.Logged, severity: this.severites.Severe});
        this.cleanBug();
    }

    cleanBug() {
        this.currentBug = new Bug(null, null, this.statuses.Logged, this.severites.Severe, null, null, null, null);
    }
}