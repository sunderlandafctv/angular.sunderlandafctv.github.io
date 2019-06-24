import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PapaParseModule } from 'ngx-papaparse';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './safc.component';

import { SharedModule } from './_shared/_shared.module';

//search stuff
import { SearchPageComponent } from './search/searchpage/searchpage.component';
import { SearchNavComponent } from './search/searchnav/searchnav.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchNavComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    PapaParseModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
