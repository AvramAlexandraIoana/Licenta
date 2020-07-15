import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/Category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../api/category.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-category-admin',
  templateUrl: './add-category-admin.page.html',
  styleUrls: ['./add-category-admin.page.scss'],
})
export class AddCategoryAdminPage implements OnInit {

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
  language: string;
  
  constructor(private formBuilder: FormBuilder,
            private categoryService: CategoryService,
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

    this.categoryForm = this.formBuilder.group({
      "categoryName": ['', [Validators.required]],
      "categoryUrl": ['', [Validators.required]]
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
  addNewCategory() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.model = new Category();
    this.model.CategoryName = this.categoryForm.controls['categoryName'].value;
    this.model.CategoryUrl = this.categoryForm.controls['categoryUrl'].value;
     this.categoryService.saveCategory(this.model).subscribe(res => {
      console.log("Categorie adaugata cu succes!");
      if (this.language == "romana") {
        this.presentToast("Category successfully added!", "success");
      } else {

      }
      this.navControl.navigateBack('category');

    });
  }

}
