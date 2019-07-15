import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatSelectModule, MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RawDataComponent } from './raw-data/raw-data.component';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './inner-pages/filter-bar/filter-bar.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';

import { AttendanceReportComponent } from './inner-pages/attendance-report/attendance-report.component';
import { MerchandiserListComponent } from './inner-pages/merchandiser-list/merchandiser-list.component';
import { MerchandiserProductivityComponent } from './inner-pages/merchandiser-productivity/merchandiser-productivity.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ShopDetailComponent } from './inner-pages/shop-detail/shop-detail.component';
import { ModalModule } from 'ngx-bootstrap';
import { UniqueBaseProductivityComponent } from './inner-pages/unique-base-productivity/unique-base-productivity.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        HttpClientModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        Ng2OrderModule,
        ModalModule.forRoot(),
        NgxPaginationModule
    ],
    declarations: [FilterBarComponent,DashboardComponent, VisitProductivityComponent, AttendanceReportComponent, MerchandiserListComponent, MerchandiserProductivityComponent, ShopDetailComponent,RawDataComponent, UniqueBaseProductivityComponent]
})
export class DashboardModule {}
