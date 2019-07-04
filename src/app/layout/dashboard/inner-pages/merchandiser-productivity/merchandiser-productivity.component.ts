import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-merchandiser-productivity',
  templateUrl: './merchandiser-productivity.component.html',
  styleUrls: ['./merchandiser-productivity.component.scss']
})
export class MerchandiserProductivityComponent implements OnInit {
  title = 'Merchandiser Productivity';
  sortBy: any;
  sortOrder: boolean;
  zones: any = [];
  regions: any = [];
  channels: any = [];
  areas: any = [];
  cities: any = [];
  startDate = new Date();
  endDate = new Date();
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  selectedZone: any={};
  selectedRegion: any={};
  loading: boolean;
  selectedCity: any={};
  selectedDistribution: any={};
  selectedStoreType: any="";
  tableData: any=[];
  distributionList: any = [];
  storeType: any = ['Elite',
  'Platinum',
  'Gold',
  'Silver',
  'Others']
  loadingData: boolean;
  selectedArea: {};
  loadingReportMessage: boolean;


  constructor(public toastr:ToastrService,public router:Router,private httpService:DashboardService) { }

  ngOnInit() {

    this.getTabsData();
    this.getZone();
  }

  sortIt(key){
    this.sortBy=key;
    this.sortOrder=!this.sortOrder;
  }
  getArrowType(key){
    if(key==this.sortBy){
      return (this.sortOrder)?'arrow_upward':'arrow_downward';
    }else
    return ''
  }

  getTabsData(data?: any, dateType?: string) {

    this.loading = true;
    let obj: any = {
     // zoneId: (this.selectedZone.id) ? this.selectedZone.id : -1,
      regionId: (this.selectedRegion.id) ? this.selectedRegion.id : -1,
      startDate: (dateType == 'start') ? moment(data).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD'),
      endDate: (dateType == 'end') ? moment(data).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD'),
      //cityId: this.selectedCity.id || -1,
     // distributionId: this.selectedDistribution.id || -1,
     // storeType: this.selectedStoreType || null,
     // channelId: -1
    }
    localStorage.setItem('obj', JSON.stringify(obj));
    this.getTableData(obj)





  }
  getTableData(obj) {

    this.httpService.merchandiserShopListCBL(obj).subscribe(data => {
      console.log(data, 'table data');
      const res: any = data;

      if(res) {
      this.tableData = res;
      }
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {
      // this.clearLoading();

      console.log(error, 'home error');

    });
  }

  getZone() {
    this.httpService.getZone().subscribe(
      data => {
        const res: any = data;
        if (res.zoneList) {
          localStorage.setItem('zoneList', JSON.stringify(res.zoneList));
          localStorage.setItem('assetList', JSON.stringify(res.assetList));
          localStorage.setItem('channelList', JSON.stringify(res.channelList));
        }
      },
      error => {
        this.clearLoading()

        error.status === 0 ? this.toastr.error('Please check Internet Connection', 'Error') : this.toastr.error(error.description, 'Error');
      }
    );
  }

  zoneChange() {
    this.loadingData = true;
    // this.regions = [];
    // this.channels = [];
    if (this.router.url === '/dashboard/productivity_report')
      this.getTabsData()

    this.httpService.getRegion(this.selectedZone.id).subscribe(
      data => {
        let res: any = data;
        if(res){
          this.regions = res;
        }
        else{
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }
       
        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      error => { 
        this.clearLoading()

      }
    );
  }

  MProductivityReport() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      let obj = {
        zoneId: this.selectedZone.id || -1,
        regionId: this.selectedRegion.id || -1,
        cityId: this.selectedCity.id || -1,
        distributionId: this.selectedDistribution.id || -1,
        storeType: this.selectedStoreType || null,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        // totalShops: this.selectedImpactType,
        channelId: -1

      };
      let url = 'productivityreport'
      let body = `type=2&pageType=1&zoneId=${obj.zoneId}&regionId=${obj.regionId}&startDate=${obj.startDate}&endDate=${obj.endDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;

      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        let res: any = data

        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }

      }, error => {
        this.clearLoading()

        console.log(error, 'productivity error')

      })
    } else {
      this.clearLoading()

      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

  }

  regionChange() {

    this.selectedArea = {}
    this.selectedCity = {}
    this.selectedDistribution = {};
    if (this.router.url == '/dashboard/daily_visit_report')
      // this.getMerchandiserList(this.startDate);

    // if (this.router.url === '/dashboard/productivity_report')
      this.getTabsData()
    if ((this.router.url !== '/dashboard/daily_visit_report')) {
      this.loadingData = true;

      console.log('regions id', this.selectedRegion);
      this.httpService.getCities(this.selectedRegion.id).subscribe(
        data => {
          // this.channels = data[0];
          let res: any = data;
          if(res){
            this.areas = res.areaList;
            this.cities = res.cityList;
            this.distributionList = res.distributionList
          }
          else{
            // this.clearLoading();
            this.toastr.info('Something went wrong,Please retry','Connectivity Message')
          }
         

          setTimeout(() => {
            this.loadingData = false;
          }, 500);
        },
        error => { 
          this.clearLoading()

        }
      );
    }
    if (this.router.url === '/dashboard/daily_visit_report') {
      // this.getMerchandiserList(this.startDate)
    }
  }

  categoryChange() {
    // this.loadingData = true;

    // this.httpService.getProducts(this.selectedCategory.id).subscribe(
    //   data => {
    //     this.productsList = data;

    //     setTimeout(() => {
    //       this.loadingData = false;
    //     }, 500);
    //   },
    //   error => {
      // this.clearLoading()

    //  }
    // );
  }

  cityChange() {
    // this.httpService.getAreas(this.selectedChannel).subscribe(
    //   data => {
    //     this.areas = data;
    //     // this.filterAllData();
    //   },
    //   error => { 
      // this.clearLoading()

    // }
    // );
  }

  chanelChange() {
    // console.log('seelcted chanel', this.selectedChannel);
    // this.httpService.getAreas(this.selectedChannel).subscribe(
    //   data => {
    //     this.areas = data;
    //     // this.filterAllData();
    //   },
    //   error => { 
      // this.clearLoading()

    // }
    // );
  }

  clearLoading(){
    this.loading=false;
    this.loadingData=false;
    this.loadingReportMessage=false;
  }

  
  getproductivityDownload(obj, url) {
    const u = url
    this.httpService.DownloadResource(obj, u);
  setTimeout(() => {
    this.loadingData = false;
    this.loadingReportMessage = false;
  }, 1000);

  }
}
