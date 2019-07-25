import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule }   from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PapaParseModule } from "ngx-papaparse";

//general routing
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./safc.component";

//search box component
import { SharedModule } from "./_shared/_shared.module";

//search page components
import { SearchPageComponent } from "./search/searchpage/searchpage.component";
import { SearchNavComponent } from "./search/searchnav/searchnav.component";

//404 page components
import { PageNotFoundComponent } from "./404/page-not-found/page-not-found.component";
import { PageNotFoundNavComponent } from "./404/page-not-found-nav/page-not-found-nav.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchNavComponent,
    PageNotFoundComponent,
    PageNotFoundNavComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    PapaParseModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
