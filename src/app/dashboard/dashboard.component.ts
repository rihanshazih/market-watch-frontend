import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, merge, switchMap, tap} from 'rxjs/operators';
import {ItemWatchService} from '../item-watch.service';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    itemWatches: any[];
    notFound: boolean;
    suggestionSearchFailed: boolean;
    selected: any;
    searching: boolean;
    threshold: number;
    submitting: boolean;
    alreadyPresent: boolean;

    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
    structureId: number;
    selectedComparator = 'lt';

    constructor(private itemWatchService: ItemWatchService, private router: Router) {
        // remove old token version
        if (localStorage.getItem('market-watch-token')) {
            localStorage.removeItem('market-watch-token');
            router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.structureId = +localStorage.getItem('market-watch-structure-id');
        this.loadItemWatches();
    }

    loadItemWatches() {
        this.itemWatches = null;
        this.itemWatchService.get(this.structureId).subscribe((data) => {
            this.itemWatches = data;
        });
    }
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term =>
                this.itemWatchService.getAvailable(term).pipe(
                    tap(() => this.suggestionSearchFailed = false),
                    catchError(() => {
                        this.suggestionSearchFailed = true;
                        return Observable.of([]);
                    }))
            ),
            tap(() => this.searching = false),
            merge(this.hideSearchingWhenUnsubscribed)
        );

    submitItemWatch() {
        this.notFound = false;
        this.alreadyPresent = false;
        if (this.itemWatches != null && !this.selected.includes('evepraisal')) {
            this.itemWatches.forEach(watch => {
                if (watch['typeName'].toLowerCase() === this.selected.toLowerCase()) {
                    this.selected = null;
                    this.threshold = null;
                    this.selectedComparator = 'lt';
                    this.alreadyPresent = true;
                }
            });
        }

        if (!this.alreadyPresent && this.selected) {
            const itemWatch = {
                typeName: this.selected,
                locationId: this.structureId,
                threshold: this.threshold,
                comparator: this.selectedComparator
            };

            this.submitting = true;
            this.notFound = false;

            this.itemWatchService.put(itemWatch).subscribe((data) => {
                this.selected = null;
                this.threshold = null;
                this.submitting = false;
                this.itemWatches.unshift(data);
            }, (err) => {
                if (err.status === 404) {
                    this.notFound = true;
                }
                this.submitting = false;
            });
        }
    }

    delete(id: string) {
        this.itemWatches = this.itemWatches.filter(item => item.id !== id);
        this.itemWatchService.delete(id).subscribe((data) => {
        }, (err) => {
            console.log(err);
        });
    }

    structureSelected(structureId: number) {
        this.structureId = structureId;
        this.loadItemWatches();
    }

    logout() {
        localStorage.removeItem(environment.tokenVersion);
        localStorage.removeItem('market-watch-structure');
        localStorage.removeItem('market-watch-structure-id');
        this.router.navigate(['/']);
    }
}
