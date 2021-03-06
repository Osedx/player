import { HttpModule, Http, Response } from '@angular/http';
import { CoreModule } from './core/core.module';
import { enableProdMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { PagesModule } from './pages/pages.module';
// import { PipesModule } from './pipes';
import { AppComponent } from './app.component';

import { APP_CONFIG, AppConfig } from './app.config';

@NgModule({
    imports: [
        CoreModule,
        BrowserModule,
        CommonModule,
        HttpModule,
        PagesModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
