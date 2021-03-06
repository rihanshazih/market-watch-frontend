import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private router: Router) {
        if (localStorage.getItem(environment.tokenVersion)) {
            const token = localStorage.getItem(environment.tokenVersion);
            if (new JwtHelperService().isTokenExpired(token)) {
                localStorage.removeItem(environment.tokenVersion);
                router.navigate(['/']);
            }
        }
    }
}
