import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../api/category.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Category } from '../_models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  isInit: boolean = false;

  categoryForms: FormArray = this.formBuilder.array([]);
  notification: { class: string; message: string; };
  typeView: string;
  model: Category;
  language: string;
  isKeyPress: boolean;
  inputValue: string;


  constructor(private formBuilder: FormBuilder,
              private categroyService: CategoryService,
              private navControl: NavController) {
               
  }

  ionViewWillEnter(){
    if (!this.isInit) {
      this.getCategoryLists();
    } else {
      this.isInit = false;
    }
  }


  ngOnInit() {
    this.isInit = true;
    this.language = localStorage.getItem("limba");
    this.getCategoryLists();
  }


  getCategoryLists() {
    this.categroyService.getCategoryList().subscribe(res => {
      if (res == []) {
        this.addCategoryForm();
      } else {
        this.categoryForms = this.formBuilder.array([]);
        //generate form array
        (res as []).forEach((category: any) => {
          this.categoryForms.push(this.formBuilder.group({
            categoryId: [category.categoryId],
            categoryName: [category.categoryName, Validators.required],
            categoryUrl: [category.categoryUrl, [Validators.required]]
          }));

        });

      }

    });
  }
  addCategoryForm() {
    this.categoryForms.push(this.formBuilder.group({
      categoryId: [0],
      categoryName: ['', Validators.required],
      categoryUrl: ['', [Validators.required]]
    }));
  }

  newCategory() {
    this.navControl.navigateRoot('add-category-admin');

  }

  recordSubmit(fg: FormGroup) {
    this.typeView = "updateCategory";

    this.model = new Category();
    this.model.CategoryId = fg.controls["categoryId"].value;
    this.model.CategoryName = fg.controls["categoryName"].value;
    this.model.CategoryUrl = fg.controls["categoryUrl"].value;

    console.log(this.model);
    this.setNavigation(this.typeView, "update-category", this.model);

  }
 
  setNavigation(param: string, url: string, val)  //navigate with parameters
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
          type: param,
          special: JSON.stringify(val)
      }
    };
    
    this.navControl.navigateForward([url],navigationExtras);
    //this.navControl.navigateBack("request");
  }

  onKeyUp(event) {
  }


  onDelete(categoryId : number, index: number) {
    if (categoryId == 0) {
      this.categoryForms.removeAt(index);
    } else if (confirm("Are you sure to delete this record? ")){
      this.categroyService.deleteCategory(categoryId).subscribe( res => {
        console.log("Sters");
        this.categoryForms.removeAt(index);
        this.showNotification('delete');


      });
    }
  }


  showNotification(category) {
    switch (category) {
      case 'insert':
        this.notification = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notification = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notification = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }


}
