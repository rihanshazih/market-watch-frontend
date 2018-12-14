import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../user.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {ItemWatchService} from '../../item-watch.service';

@Component({
    selector: 'app-danger-zone',
    templateUrl: './danger-zone.component.html',
    styleUrls: ['./danger-zone.component.css']
})
export class DangerZoneComponent implements OnInit {
    submitting: boolean;
    showConfirmation: boolean;

    @Output() onDeleteItemWatches: EventEmitter<any> = new EventEmitter();

    constructor(private service: UserService, private router: Router, private itemWatchService: ItemWatchService) {
    }

    ngOnInit() {
    }

    deleteAccount() {
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

    deleteAllItemWatches() {
        this.submitting = true;
        this.itemWatchService.deleteAll().subscribe((data) => {
            localStorage.removeItem('market-watch-structure');
            localStorage.removeItem('market-watch-structure-id');
            this.submitting = false;
            this.onDeleteItemWatches.emit();
        }, (err) => {
            console.log(err);
            alert('Failed to delete all thresholds. Please try again later.');
        });
    }
}
