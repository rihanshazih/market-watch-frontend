import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, merge, switchMap, tap} from 'rxjs/operators';
import {StructureService} from '../../structure.service';
import {MarketService} from '../../market.service';

@Component({
    selector: 'app-structure-selector',
    templateUrl: './structure-selector.component.html',
    styleUrls: ['./structure-selector.component.css']
})
export class StructureSelectorComponent implements OnInit {
    structureName: string;
    notFound: boolean;
    suggestionSearchFailed: boolean;
    selected: any;
    searching: boolean;
    submitting: boolean;
    markets: any[];
    loadingMarkets: boolean;

    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

    @Output() onSelect: EventEmitter<number> = new EventEmitter();

    constructor(private service: StructureService, private marketService: MarketService) {
        this.structureName = localStorage.getItem('market-watch-structure') || 'none';
    }

    ngOnInit() {
    }

    private loadMarkets() {
        this.loadingMarkets = true;
        this.marketService.getMyActiveMarkets().subscribe((data) => {
            this.markets = data;
            this.loadingMarkets = false;
        }, (err) => {
            console.log(err);
            this.loadingMarkets = false;
        });
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term =>
                this.service.getAvailable(term).pipe(
                    tap(() => this.suggestionSearchFailed = false),
                    catchError(() => {
                        this.suggestionSearchFailed = true;
                        return Observable.of([]);
                    }))
            ),
            tap(() => this.searching = false),
            merge(this.hideSearchingWhenUnsubscribed)
        );

    submit() {
        this.submitting = true;
        this.service.getStructureId(this.selected).subscribe((data) => {
            this.structureName = this.selected;
            localStorage.setItem('market-watch-structure', this.selected);
            localStorage.setItem('market-watch-structure-id', data + '');
            this.onSelect.emit(data);
            this.submitting = false;
            this.selected = null;
        }, (err) => {
            if (err.status === 404) {
                this.notFound = true;
            }
            this.submitting = false;
        });
    }

    onMarketSelect(market: any) {
        this.onSelect.emit(market.structureId);
        this.structureName = market.structureName;
        localStorage.setItem('market-watch-structure', market.structureName);
        localStorage.setItem('market-watch-structure-id', market.structureId);
    }

    displayMarkets(displayMarkets: boolean) {
        if (displayMarkets) {
            this.loadMarkets();
        } else {
            this.markets = null;
        }
    }
}
