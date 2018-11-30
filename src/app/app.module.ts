import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CallbackComponent} from './callback/callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import {FormsModule} from '@angular/forms';
import {ItemWatchService} from './item-watch.service';
import { StructureSelectorComponent } from './dashboard/structure-selector/structure-selector.component';
import {StructureService} from './structure.service';
import { DangerZoneComponent } from './dashboard/danger-zone/danger-zone.component';
import {UserService} from './user.service';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: '',
        component: FrontpageComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        CallbackComponent,
        DashboardComponent,
        FrontpageComponent,
        StructureSelectorComponent,
        DangerZoneComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false} // <-- debugging purposes only
        ),
        HttpClientModule,
        FormsModule
    ],
    providers: [ItemWatchService, StructureService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
