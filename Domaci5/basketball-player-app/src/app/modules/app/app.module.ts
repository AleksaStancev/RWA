import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../../components/app/app.component';
import { CardComponent } from '../../components/card/card-card/card.component';
import { CardListComponent } from '../../components/card/card-list/card-list.component';
import { CardExpansionPanelComponent } from '../../components/card/card-expansion-panel/card-expansion-panel.component';
import { CardCollectionComponent } from '../../components/card-collection/card-collection.component';

@NgModule({
  declarations: [AppComponent, CardComponent, CardListComponent, CardExpansionPanelComponent, CardCollectionComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
