import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { SectionHomeComponent } from './section/section-home/section-home.component';
import { SectionOneViewComponent } from './section/section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './section/section-two-view/section-two-view.component';
import { SectionThreeViewComponent } from './section/section-three-view/section-three-view.component';
import { SectionLandingPageComponent } from './section/section-landing-page/section-landing-page.component';
import { ModalModule } from 'ngx-bootstrap';
import { ShopListComponent } from './section/shop-list/shop-list.component';
import { FormsModule } from '@angular/forms';
import { SectionFourComponent } from './section/section-four/section-four.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [SectionHomeComponent,SectionOneViewComponent,SectionTwoViewComponent,SectionThreeViewComponent, SectionLandingPageComponent, ShopListComponent, SectionFourComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot(),
FormsModule,
MatCardModule,
  ]
})
export class EvaluationModule { }
