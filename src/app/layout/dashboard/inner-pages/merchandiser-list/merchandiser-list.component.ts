import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.scss']
})
export class MerchandiserListComponent {

  title = 'merchandiser List';
  minDate = new Date(2000, 0, 1);
  maxDate: any = new Date();
  startDate: any = new Date();
  endDate = new Date();
  loadingReportMessage = false;
    merchandiserList: any = [];
  evaluatorId: any;
  p = 1;

  ip = '';
    constructor(private router: Router, private httpService: DashboardService, private activatedRoutes: ActivatedRoute) {

    this.maxDate.setDate(this.maxDate.getDate() - 1);
    this.startDate.setDate(this.startDate.getDate() - 1);
    this.ip = httpService.ip;

  // this.startDate=moment(this.startDate).subtract('day',1).format('YYYY/MM/DD')

  this.activatedRoutes.queryParams.subscribe(p => {
    this.evaluatorId = p.evaluatorId;
    if (!this.evaluatorId) {
    this.evaluatorId = localStorage.getItem('user_id');
    }

    this.getMerchandiserList();

  });

    }

    getMerchandiserList() {


      const obj = {
        evaluatorId: this.evaluatorId,
      };

      this.httpService.getMerchandiserListForEvaluation(obj).subscribe((data: any) => {
        console.log('merchandiser list for evaluation', data);
        this.merchandiserList = data;
      });

    }

    modifyDate(date) {
      return moment(date).format('YYYY-MM-DD');
    }

    goToShopList(item) {

      const str = `${environment.hash}dashboard/evaluation/shop_list?surveyorId=${item.id}&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(this.startDate)}`;
      // this.router.navigate([str])
      window.open(str, '_blank');
    }


}
