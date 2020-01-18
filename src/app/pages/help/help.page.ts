import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-help',
    templateUrl: './help.page.html',
    styleUrls: [ './help.page.scss' ],
})
export class HelpPage implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    callSupport() {

    }

    createTicket() {

    }

    documentation() {

    }

    get title() {
        return 'Help';
    }
}
