import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModules } from './shared/materials.module';
import { HeroPreviewComponent } from './hero-preview/hero-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ENV_CONFIG } from './shared/config/env.config';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeroPreviewComponent],
  imports: [BrowserAnimationsModule, AppRoutingModule, HttpClientModule, MaterialsModules],
  providers: [{ provide: ENV_CONFIG, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
