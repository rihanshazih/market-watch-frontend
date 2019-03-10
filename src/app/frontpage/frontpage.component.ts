import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-frontpage',
    templateUrl: './frontpage.component.html',
    styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

    authUrl = environment.ssoUrl;

    constructor(private router: Router) {
    }

    ngOnInit() {
        const token = localStorage.getItem(environment.tokenVersion);
        if (token) {
            this.router.navigate(['/dashboard']);
        }
    }

}
