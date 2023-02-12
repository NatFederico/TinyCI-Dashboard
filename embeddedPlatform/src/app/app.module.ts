import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import localeEn from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPartialComponent } from './core/components/header-partial/header-partial.component';
import { FooterPartialComponent } from './core/components/footer-partial/footer-partial.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpBackend } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coreReducers } from './core/store/reducers';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './core/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { itLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpHeaderInterceptor } from './core/interceptors/http-header.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CallbackPageComponent } from './core/pages/callback-page/callback-page.component';
import { SilentPageComponent } from './core/pages/silent-page/silent-page.component';
import { EndSessionPageComponent } from './core/pages/end-session-page/end-session-page.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgPipesModule } from 'ngx-pipes';
import { HttpRetryInterceptor } from './core/interceptors/http-retry.interceptor';
import { BoardSetupComponent } from './core/pages/board-setup/board-setup.component';

defineLocale('it', itLocale);
defineLocale('en', enGbLocale);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const metaReducers: MetaReducer<any, any>[] = environment.production ? [] : [];

let devTools = [
  StoreDevtoolsModule.instrument({
    maxAge: 50,
  }),
];

if (environment.production) {
  devTools = [];
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderPartialComponent,
    FooterPartialComponent,
    CallbackPageComponent,
    SilentPageComponent,
    EndSessionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(coreReducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    // Includere servizio solo se effettivamente utilizzato
    // StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      // aggiungere effects store ngrx
    ]),
    NgPipesModule,
    ...devTools
  ],
  providers: [
    { provide: LOCALE_ID, useValue: getLocale() },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    auth: AuthService,
    library: FaIconLibrary
    ) {
      auth.init();

      library.addIconPacks(fas);

      registerLocaleData(localeIt, 'it');
      registerLocaleData(localeEn, 'en');
    }
}


export function getLocale() {
  const locale = localStorage.getItem(environment.storage.keys.culture);
  if (locale != null && locale.length) { return locale; }
  localStorage.setItem(environment.storage.keys.culture, 'it-IT');
  return 'it-IT';
}
