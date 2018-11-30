import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private router: Router) {
        // clear old token version
        if (localStorage.getItem('market-watch-token')) {
            localStorage.removeItem('market-watch-token');
            router.navigate(['/']);
        }
    }
}
