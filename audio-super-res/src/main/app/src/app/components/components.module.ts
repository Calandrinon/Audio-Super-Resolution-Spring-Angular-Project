import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PredictionComponent } from './prediction/prediction.component';
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import { RecorderComponent } from './recorder/recorder.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PredictionComponent,
    LoadingSpinnerComponent,
    RecorderComponent,
  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        PredictionComponent,
        RecorderComponent
    ]
})
export class ComponentsModule { }
