import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-danger-zone',
    templateUrl: './danger-zone.component.html',
    styleUrls: ['./danger-zone.component.css']
})
export class DangerZoneComponent implements OnInit {
    submitting: boolean;
    showConfirmation: boolean;

    constructor(private service: UserService, private router: Router) {
    }

    ngOnInit() {
    }

    submit() {
        this.submitting = true;
        this.service.deleteAccount().subscribe((data) => {
            localStorage.removeItem(environment.tokenVersion);
            localStorage.removeItem('market-watch-structure');
            localStorage.removeItem('market-watch-structure-id');
            this.router.navigate(['/']);
        }, (err) => {
            console.log(err);
            alert('Failed to delete account. Please try again later.');
        });
    }
}
