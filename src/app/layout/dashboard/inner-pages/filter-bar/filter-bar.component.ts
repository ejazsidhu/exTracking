import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment'
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  //#region veriables
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  @Input() title;
  loadingData: boolean;
  regions: any = [];
  tableData: any = [];
  queryList: any = [];
  selectedQuery: any = {};
  selectedRegion: any = {};
  merchandiser: any = {};
  sortOrder = true;
  sortBy: 'completed'
  startDate = new Date();
  endDate = new Date();

  loadingReportMessage: boolean = false;
  tabsData: any = [];
  loading = true;
  RTEList: any = [];
  selectedRTE: any = {}
  merchandiserRTEList: any = [];
  selectedMerchandiserRTE: any = {}

  //#endregion

  constructor(private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.getRegions()
    console.log(this.router.url);
    if (this.router.url === '/dashboard/visit_productivity') {
      this.getTabsData();
    }
    if (this.router.url === '/dashboard/raw_data') {
      this.getQueryTypeList();
    }
  }
  getRTE(regionId) {
    this.httpService.getRTE(regionId).subscribe((data: any) => {
      if (data) {
        this.RTEList = data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }

      this.getTabsData();
    })
  }
  getMerchandiserListRTE(regionId) {
    this.httpService.getMerchandiserListRTE(regionId).subscribe((data: any) => {
      if (data) {
        this.merchandiserRTEList = data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }


      this.getTabsData();
    })
  }
  regionChange() {
    this.loading = true;
    this.RTEList = [];
    this.selectedRTE = {}
    this.merchandiserRTEList = [];
    this.selectedMerchandiserRTE = {}

    this.getRTE(this.selectedRegion.id)


  }


  regionRTE() {
    this.merchandiserRTEList = [];
    this.selectedMerchandiserRTE = {}
    this.loading = true;
    this.getMerchandiserListRTE(this.selectedRTE.id)

  }

  statsMerchandiserWise() {
    this.loading = true;
    this.getTabsData();
  }
  getQueryTypeList() {

    this.httpService.getQueryTypeList().subscribe(data => {
      console.log('qurry list', data);
      if (data)
        this.queryList = data;

    }, error => {
      (error.status === 0) ?
        this.toastr.error('Please check Internet Connection', 'Error') :
        this.toastr.error(error.description, 'Error');


    })

  }


  downloadReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      let obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        rteId: this.selectedRTE.id || -1,
        merchandiserId: this.selectedMerchandiserRTE.id || -1,
      }

      let url = 'visitProductivityReport';
      let body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        let res: any = data

        if (res) {
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message')
        }
      })

    }
    else {
      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

  }


  downloadUniqueBaseProductivityReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      this.loadingData = true;
      let obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      }

      let url = 'capturedAbnormalUnvisited';
      let body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        let res: any = data

        if (res) {
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message')
        }
      })

    }
    else {
      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

  }

  downloadRawDataReport() {

    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      let obj = {
        typeId: this.selectedQuery.id,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      }

      let url = 'dashboard-data';
      let body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForProductivityReport(body, url).subscribe(data => {
        console.log(data, 'query list');
        let res: any = data

        if (res) {
          let obj2 = {
            key: res.key,
            fileType: res.fileType
          }
          let url = 'downloadcsvReport'
          this.getproductivityDownload(obj2, url)
        }
        else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message')
        }


      }, error => {
        // this.clearLoading()

      })
    } else {
      // this.clearLoading();
      this.toastr.info('End date must be greater than start date', 'Date Selection');
    }
  }
  downloadAttandanceReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      let obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      }

      let url = 'merchandiserAttendance';
      let body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        let res: any = data

        if (res) {
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message')
        }
      })

    }
    else {
      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }

  }

  getRegions() {
    this.loading = true;
    this.httpService.getRegionFixed().subscribe(data => {
      if (data) {
        this.regions = data;

        //this.selectedRegion=data[0]
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }

    })
  }
  getproductivityDownload(obj, url) {
    const u = url
    this.httpService.DownloadResource(obj, u);
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
    }, 1000);

  }

  getAttendanceDownload(obj, url) {
    const u = url
    this.httpService.DownloadResource(obj, u);
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
    }, 1000);

  }

  getTabsData(data?: any, dateType?: string) {

    this.loading = true;
    // debugger;
    let obj: any = {
      //zoneId: (this.selectedZone.id) ? this.selectedZone.id : -1,
      regionId: (this.selectedRegion.id) ? this.selectedRegion.id : localStorage.getItem('regionId'),
      startDate: (dateType == 'start') ? moment(data).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD'),
      endDate: (dateType == 'end') ? moment(data).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD'),
      rteId: this.selectedRTE.id || -1,
      merchandiserId: this.selectedMerchandiserRTE.id || -1

    }
    localStorage.setItem('obj', JSON.stringify(obj));
    this.getTableData(obj)


    this.httpService.getDashboardData(obj).subscribe(data => {
      // console.log(data, 'home data');
      const res: any = data
      if (res) {
        this.tabsData = data;
      }
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {


    })


  }
  getTableData(obj) {

    this.httpService.merchandiserShopListCBL(obj).subscribe(data => {
      console.log(data, 'table data');
      const res: any = data;

      if (res) {
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

  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }
  getArrowType(key) {
    if (key == this.sortBy) {
      return (this.sortOrder) ? 'arrow_upward' : 'arrow_downward';
    } else
      return ''
  }
}
