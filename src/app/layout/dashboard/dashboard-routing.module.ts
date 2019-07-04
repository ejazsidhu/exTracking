import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';

import { AttendanceReportComponent } from './inner-pages/attendance-report/attendance-report.component';
import { MerchandiserListComponent } from './inner-pages/merchandiser-list/merchandiser-list.component';
import { MerchandiserProductivityComponent } from './inner-pages/merchandiser-productivity/merchandiser-productivity.component';
import { ShopDetailComponent } from './inner-pages/shop-detail/shop-detail.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { UniqueBaseProductivityComponent } from './inner-pages/unique-base-productivity/unique-base-productivity.component';

const routes: Routes = [
    {
        path: '',
        redirectTo:'visit_productivity'
        
    },
    { path: 'visit_productivity', component: VisitProductivityComponent },
    { path: 'attendance_report', component: AttendanceReportComponent },
    { path: 'unique-base-productivity', component: UniqueBaseProductivityComponent },
    { path: 'merchandiser_List', component: MerchandiserListComponent },
    { path: 'productivity_report', component: MerchandiserProductivityComponent },
    { path: 'raw_data', component: RawDataComponent },
    { path: 'evaluation', loadChildren: '../evaluation/evaluation.module#EvaluationModule' },
    { path: 'shop_detail/:id', component: ShopDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
