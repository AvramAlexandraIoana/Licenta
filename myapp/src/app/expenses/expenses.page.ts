import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import CanvasJS from 'src/app/canvasjs.min.js'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
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

 

  logout()
  {
    this.navCtrl.navigateRoot('login')
  }

}
