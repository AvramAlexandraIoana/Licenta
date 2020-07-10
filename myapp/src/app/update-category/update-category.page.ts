import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/Category';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from '../api/category.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.page.html',
  styleUrls: ['./update-category.page.scss'],
})
export class UpdateCategoryPage implements OnInit {

  iconObject: Array<Category> = [];
  categoryForm: FormGroup;
  modifyEmailForm: FormGroup;

  errorMessages = {
    'categoryName':[
      { type:'required', message: 'Suma introdusa nu este valida'}
    ],
    'categoryUrl': [
      { type: 'required', message: 'Unitatea este obligatorie'}
    ]
  }
  model: Category;
  typeView: any;
  category: any;
  language: string;
  
  constructor(private formBuilder: FormBuilder,
            private categoryService: CategoryService,
            private route: ActivatedRoute,
            private toastController: ToastController,
            private navControl: NavController) { }

  ngOnInit() {
    this.language = localStorage.getItem("limba");

    var item = new Category();
    item.CategoryName = "Transport";
    item.CategoryUrl = "transport.svg";
    this.iconObject.push(item);

    var item1 = new Category();
    item1.CategoryName = "Foods";
    item1.CategoryUrl = "foods.svg";
    this.iconObject.push(item1);

    var item2 = new Category();
    item2.CategoryName = "Shopping";
    item2.CategoryUrl = "shopping1.svg";
    this.iconObject.push(item2);

    var item3 = new Category();
    item3.CategoryName = "Bills";
    item3.CategoryUrl = "bill1.svg";
    this.iconObject.push(item3);

    var item4 = new Category();
    item4.CategoryName = "Taxs";
    item4.CategoryUrl = "tax.svg";
    this.iconObject.push(item4);

    console.log(this.iconObject);

    this.route.queryParams.subscribe(params => {
      this.typeView = params["type"];
      if (params && params.special) {
        this.category = JSON.parse(params.special);
        console.log(this.category);
      }
    });

    this.categoryForm = this.formBuilder.group({
      "categoryId": [this.category.CategoryId],
      "categoryName": [this.category.CategoryName, [Validators.required]],
      "categoryUrl": [this.category.CategoryUrl, [Validators.required]]
    })
  }

  async presentToast(text, type) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000,
        color: type
      });
    toast.present();
  }


  updateCategory() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.model = new Category();
    this.model.CategoryName = this.categoryForm.controls['categoryName'].value;
    this.model.CategoryUrl = this.categoryForm.controls['categoryUrl'].value;
     this.categoryService.updateCategory(this.categoryForm.controls["categoryId"].value, this.model).subscribe(res => {
      console.log("Categorie updatata cu succes!");
      this.presentToast("Categorie updatata cu succes!", "success");
      this.navControl.navigateBack('category');

    });
  }
}
