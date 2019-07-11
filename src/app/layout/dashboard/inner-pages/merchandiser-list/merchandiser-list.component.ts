import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.scss']
})
export class MerchandiserListComponent{

  title="merchandiser List"
  minDate = new Date(2000, 0, 1);
  maxDate:any = new Date();
  startDate:any=new Date();
  endDate=new Date();
  loadingReportMessage=false;
    merchandiserList: any=[];
  evaluatorId: any;
    constructor(private httpService:DashboardService,private activatedRoutes:ActivatedRoute) { 
  
    this.maxDate.setDate(this.maxDate.getDate()-1);
    this.startDate.setDate(this.startDate.getDate()-1)
  
  // this.startDate=moment(this.startDate).subtract('day',1).format('YYYY/MM/DD')

  this.activatedRoutes.queryParams.subscribe(p=>{
    this.evaluatorId=p.evaluatorId;
    if(!this.evaluatorId)
    this.evaluatorId=localStorage.getItem('user_id')

    this.getMerchandiserList();

  })
  
    }
  
    getMerchandiserList(){


      let obj={
        evaluatorId:this.evaluatorId,
      };
  
      this.httpService.getMerchandiserListForEvaluation(obj).subscribe((data:any)=>{
        console.log('merchandiser list for evaluation',data);
        this.merchandiserList=data;
      })
  
    }
  
    modifyDate(date){
      return moment(date).format('YYYY-MM-DD');
    }
  

}
