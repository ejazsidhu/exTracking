import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from '../../evaluation.service';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-section-home',
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.scss']
})
export class SectionHomeComponent implements OnInit {


  data: any = [];
  ip = environment.ip;
  loading = false;
  selectedShop: any = {}

  @ViewChild('childModal') childModal: ModalDirective;


  score: any = 0;

  indexList: any = [];
  surveyId: any = 0;
  remarksList: any = [];
  selectedRemarks: any = false;
  selectedCriteria: any =0;
  evaluationArray: any = [];
  productList: any = [];
  msl: any;
  availabilityCount: number;
  cloneArray: any = [];
  isFromShop: boolean = true;
  rotationDegree: number = 0;
  isEditable: any = false;

  constructor(private toastr: ToastrService, private activatedRoutes: ActivatedRoute, private httpService: EvaluationService) {
    this.surveyId
    this.httpService.ip;
    this.activatedRoutes.queryParams.subscribe(q => {

      if (q.location)
        this.isFromShop = false;
    })
    this.activatedRoutes.params.subscribe(params => {


      this.surveyId = params.id;

      let obj = {
        merchandiserShopId: this.surveyId,
        // userTypeId: localStorage.getItem('user_type')
      }

      this.getData(obj)
    });

  }

  ngOnInit() {
  }


  rotateImage() {
    if (this.rotationDegree == 360) {
      this.rotationDegree = 90;
    }
    else {
      this.rotationDegree += 90;
    }


  }
  getData(obj) {

    this.httpService.getShopDetails(obj).subscribe(data => {
      if (data) {
        this.data = data;

        document.title = this.data.section[0].sectionTitle;
        if (this.data.criteria) {
          this.evaluationArray = this.data.criteria;
          this.selectedCriteria=this.data.criteria[0].id;
          this.cloneArray = this.evaluationArray.slice();
        }


        // console.log(this.data)
        // this.remarksList=this.data.remarks;
        this.productList = this.data.productList;

        localStorage.setItem('productList', JSON.stringify(this.productList))
        // this.msl=this.data.msl;
        // this.isEditable=this.data.isEditable || this.isEditable;
        // if(this.productList.length>0)
        // this.availabilityCount=this.getAvailabilityCount(this.productList);
        // if(this.data.criteria)
        // this.calculateScore();

      }

    }, error => { })

  }

  calculateMSLAgain(products) {
    this.msl = this.data.msl
    localStorage.setItem('productList', JSON.stringify(products));
    this.productList = localStorage.getItem('productList');

    this.availabilityCount = this.getAvailabilityCount(products);

  }

  getAvailabilityCount(products) {
    if (!products) {
      products = localStorage.getItem('productList')
    }
    let pro = products.map(p => p.available_sku)
    let sum = pro.reduce((a, v) => a + v);
    return (sum / pro.length) * (this.msl);
  }

  getCriteriaWithRemarks(remarks, criteria) {
    let obj = {
      remarkId: remarks,
      id: criteria.id,
      title: criteria.title,
      score: 0
    }
    this.cloneArray.forEach(element => {

      var i = this.cloneArray.findIndex(e => e.id == criteria.id);
      this.cloneArray.splice(i, 1, obj);

    });

    // this.evaluationArray.push(obj);
    console.log('evaluation array clone', this.cloneArray);
    // this.hideRemarksModal();
    this.selectedRemarks = ''


  }
  // counter(event,criteria,index){

  //   // console.dir(event.checked)
  //   if(event.checked){
  //     this.score=this.score-criteria.score;
  //     this.indexList.push(index);
  //     // console.log('checked',this.indexList)
  //     this.selectedCriteria=criteria
  //     this.showRemarksModal();

  //   }
  //   else{
  //     this.score=this.score+criteria.score;
  //     let i=this.indexList.findIndex(i=>i==index)
  //     this.indexList.splice(i,1);

  //     if(this.evaluationArray.length>0){
  //       let obj={
  //         id:criteria.id,
  //         title:criteria.title,
  //         score:criteria.score,
  //         remarkId:0
  //       }
  //       let e=this.evaluationArray.findIndex(i=>i.id==criteria.id)
  //       this.cloneArray.splice(e,1,obj);
  //     console.log('unchecked evaluation array',this.cloneArray)

  //     }

  //   }
  // }

  calculateScore() {
    this.score
    this.data.criteria.map(c => { this.score += c.score });
    // this.score=this.score-(this.msl);

    console.log('total score is', this.score)
  }


  showChildModal(shop): void {
    this.selectedShop = shop;
    this.rotationDegree = 0;
    this.childModal.show();
  }

  hideChildModal(): void {

    this.childModal.hide();

  }

  evaluateShop(){

    let obj={
      criteriaId:this.selectedCriteria,
      surveyId:this.surveyId,
      evaluatorId:localStorage.getItem('user_id')
    }
    console.log('selected criteria',obj);
    this.httpService.evaluateShop(obj).subscribe((data:any)=>{
      // console.log('evaluated shop data',data);
      this.loading=false;
      
      if(data.success){
      this.toastr.success('shop evaluated successfully ');
  
      setTimeout(() => {
        
      window.close();
        
      }, 2000);
      }
      else{
        this.toastr.info(data.errorMessage,'Info')
      }
      },error=>{
      // console.log('evaluated shop error',error)
      // window.close()
      this.loading=false;
      this.toastr.error(error.message,'Error');
      
      })

  }
    

  // showRemarksModal(){
  //   this.remarksModal.show()
  // }
  // hideRemarksModal(){
  //   if(!!this.selectedRemarks)
  //   this.remarksModal.hide()
  //   else{
  //     this.toastr.info(`please select remarks for "${this.selectedCriteria.title}"`)
  //   }
  // }

}
