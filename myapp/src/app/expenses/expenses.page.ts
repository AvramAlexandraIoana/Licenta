import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import CanvasJS from 'src/app/canvasjs.min.js'
import { CategoryTransactionsService } from '../api/category-transactions.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { UserService } from '../api/user.service';

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


  constructor(private navCtrl: NavController, 
              private categoryTransactionService: CategoryTransactionsService,
              private userService: UserService) { }

  ngOnInit() {
    this.userId = this.getUserId();
    this.getUser();
    let dataPoints = [];
	  let dpsLength = 0;
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      title:{
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        content: "IOANA",
        indexLabel: "{name} - #percent%",
        dataPoints: dataPoints,
          // { y: 450, name: "Food" },
          // { y: 120, name: "Insurance" },
            // { y: 200, name: "Traveling"},
            // { y: 800, name: "Housing" },
          // { y: 150, name: "Education" },
          // { y: 150, name: "Shopping"},
          // { y: 250, name: "Others" }
      }]
    });
    dataPoints.push({y : 200, name: "Traveling"});
    dataPoints.push({y : 800, name: "Housing"});

      
    chart.render();
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(res => {
      console.log(res);
      this.user = res;
      this.getData();
    })
  }

  getUserId() {
    var userToken = localStorage.getItem('token');
    if (userToken) {
        this.decodedToken = this.jwtHelper.decodeToken(userToken);
        return Number(this.decodedToken.nameid);
    }
  }

  getData() {
    this.categoryTransactionService.getSumPerCategory(this.user.id, this.user.defaultCard).subscribe(res => {
      console.log(res);
    })
  }

 

  logout()
  {
    this.navCtrl.navigateRoot('login')
  }

}
