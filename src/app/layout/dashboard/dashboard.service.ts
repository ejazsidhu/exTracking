import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // ip='http://localhost:8080/census/'
 
  // ip: any='http://192.168.3.209:8080/audit/';
  // ip: any='http://192.168.3.189:8080/audit/';
  // ip: any='http://192.168.3.94:8080/audit/';
  ip: any='http://192.168.3.94:8080/census/';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };
  user_id:any=0;
 

  constructor(private http:HttpClient) {
    this.user_id=localStorage.getItem('user_id')

   }


   merchandiserShopListCBL(obj) {
    const body = this.UrlEncodeMaker(obj);
    // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    const url = this.ip + 'merchandiserShopListCBL';
    return this.http.post(url, body, this.httpOptions);
   
  }
   public login(credentials: any) {
    // let body=JSON.stringify(credentials)
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
  
  }
  getZone() {
    this.user_id=localStorage.getItem('user_id')

    const filter = JSON.stringify({ act: 0 ,userId:this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);

  }

  getCities(regionId) {
    this.user_id=localStorage.getItem('user_id')

    const filter = JSON.stringify({ act: 2, regionId: regionId ,userId:this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  
  }

  getAreas(channelId) {
    this.user_id=localStorage.getItem('user_id')

    const filter = JSON.stringify({ act: 3, channelId: channelId,userId:this.user_id });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);

  }

   getRegion(zoneId) {
    this.user_id=localStorage.getItem('user_id')

    const filter = JSON.stringify({ act: 1, zoneId: zoneId,userId:this.user_id });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  
  }
  
  getMerchandiserListForEvaluation(obj){

    let urlEncode=this.UrlEncodeMaker(obj)
    const url = this.ip + 'merchandiserList';
    return this.http.post(url, urlEncode,this.httpOptions);
  }

  getRegionFixed() {
    this.user_id=localStorage.getItem('user_id');
      const filter = JSON.stringify({ act: 7,userId:this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
   
  }

  getRTE(regionID) {
    const filter = JSON.stringify({ act:8 ,regionId:regionID});
  const url = this.ip + 'loadFilters';
  return this.http.post(url, filter);
 
}

getMerchandiserListRTE(rteId) {
  const filter = JSON.stringify({ act:9 ,rteId:rteId});
const url = this.ip + 'loadFilters';
return this.http.post(url, filter);

}

  public DownloadResource(obj, url) {
    let path;

    path = this.ip + url;


    const form = document.createElement('form');

    form.setAttribute('action', path);

    form.setAttribute('method', 'post');
    // form.setAttribute('target', '_blank');

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);


  }
  private appendInputToForm(form, obj) {
    Object.keys(obj).forEach(key => {
      const input = document.createElement('input');

      input.setAttribute('value', obj[key]);

      input.setAttribute('name', key);

      form.appendChild(input);
    });
  }
  UrlEncodeMaker(obj) {
    let url = '';
      for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }

  getKeyForReport(reportUrl,body) {
    const url = this.ip + reportUrl;
    return this.http.post(url, body, this.httpOptions);
  
  }

  getKeyForProductivityReport(body, reportUrl) {
    const url = this.ip + reportUrl;
    return this.http.post(url, body, this.httpOptions);

  }
  getTableList(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + 'completedShopListCBL';
    return this.http.post(url, body, this.httpOptions);
  }
  getQueryTypeList(){
    this.user_id=localStorage.getItem('user_id')

    const filter = JSON.stringify({ act: 6 ,userId:this.user_id});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }
  getDashboardData(obj) {
    let body = null;
    if (obj != null) {
      body = this.UrlEncodeMaker(obj)
      // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    }
    const url = this.ip + 'dashboardDataCBL';
    return this.http.post(url, body, this.httpOptions);


  }

}
