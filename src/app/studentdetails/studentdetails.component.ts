import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from './studentdetails.model';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements OnInit {

  formValue !: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  showAdd!: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      course : ['']
    })
    this.getAllStudent();
  }
  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postStudentDetails(){
    this.studentModelObj.firstName = this.formValue.value.firstName;
    this.studentModelObj.lastName = this.formValue.value.lastName;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.course = this.formValue.value.course;

    this.api.postStudent(this.studentModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Student Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    },
    err=>{
      alert("Something Went Wrong")
    })
  }
  getAllStudent(){
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData = res;

    })
  }

  deleteStudent(row : any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Student Deleted")
      this.getAllStudent();
    })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['course'].setValue(row.course)
  }
  updateStudentDetails(){
    this.studentModelObj.firstName = this.formValue.value.firstName;
    this.studentModelObj.lastName = this.formValue.value.lastName;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.course = this.formValue.value.course;
    this.api.updateStudent(this.studentModelObj,this.studentModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    })

  }

}

