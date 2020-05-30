import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import CanvasJS from 'src/app/canvasjs.min.js'
import { CategoryTransactionsService } from '../api/category-transactions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';
import { CategoryService } from '../api/category.service';
import _ from 'lodash';
import { Category } from '../_models/Category';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  decodedToken: any;
  jwtHelper = new JwtHelperService();
  user: User;
  userId: number;
  categories: Category[];
  data: any;
  dataShow: any = [];
  todayDate : Date = new Date();

  months = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "noiembrie", "decembrie"];
  month: number;
  luna: string;

  constructor(private navCtrl: NavController, 
              private categoryTransactionService: CategoryTransactionsService,
              private userService: UserService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.month = this.todayDate.getMonth();
    this.luna = this.months[this.month];
    console.log(this.luna);
  
    
    console.log(this.months[this.todayDate.getMonth()]);
    this.userId = this.getUserId();
    this.getUser();
    
  }


  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      console.log(res);
      this.user = res;
      this.categoryList();
      this.getData(this.month);
    })
  }

  categoryList() {
    this.categoryService.getCategoryList().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getData(month: number) {
    this.categoryTransactionService.getSumPerCategory(this.user.id, this.user.defaultCard, month).subscribe(res => {
      console.log(res);
      this.data = res;
      this.renderData();
    })
  }

  renderData() {
    let dataPoints = [];
    this.dataShow = [];
    let dpsLength = 0;
    console.log(this.user.defaultCard)
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      title:{
        text: ""
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {unit}{y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: dataPoints,
      }]
    });
    var sum = 0;
    var money = 0;
    var moned = "RON";
    if (this.user.defaultCard == "r") {
      moned =  "RON";
      
    } else if (this.user.defaultCard == "$") {
      moned = "USD";
      
    } else if (this.user.defaultCard == "€") {
      moned = "EUR";
    }    
    for (var i = 0; i < this.data.length; i++) {
      var x = this.data[i];
      var findCategory = _.find(this.categories, function(object) {
        return object.categoryId ==  x.id;
      });
      if (findCategory) {
        console.log(findCategory);
        dataPoints.push({y : x.sum, name: findCategory.categoryName, unit: this.user.defaultCard});
        this.dataShow.push({name: findCategory.categoryName, url: findCategory.categoryUrl, size: x.size, sum: x.sum, conversion: moned});
        sum += x.sum;
      }
     
    }

    if (this.user.defaultCard == "r") {
      money = this.user.sumaR - sum;
      
    } else if (this.user.defaultCard == "$") {
      money = this.user.sumaD - sum;
      
    } else if (this.user.defaultCard == "€") {
      money = this.user.sumaE - sum;
    }
    if (x.size) {
      dataPoints.push({y : money, name: "Transferuri Pay",  unit: this.user.defaultCard});
      this.dataShow.push({name: "Transferuri Pay", size: x.size, sum: x.sum, conversion: moned});
    }
    console.log(this.data);
    console.log(this.dataShow);

      
    chart.render();
  }

  change(event) {
    console.log("Ioana");
    console.log(event.target.value);
    var luna;
    if (event.target.value == "months[month]") {
      luna = this.month;
    } else  if (event.target.value == "months[month - 1]") {
      luna = this.month - 1;
    } else  if (event.target.value == "months[month - 2]") {
      luna = this.month - 2;
    }
    console.log(luna);
    this.getData(luna);
  }
  

 

  logout()
  {
    this.navCtrl.navigateRoot('login')
  }

}
