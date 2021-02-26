import { Router } from '@angular/router';
import { Service } from './../common.services/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { data } from 'jquery';
  declare var $ ;
 
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {
  empList = [];
   regForm:FormGroup;
  constructor( private fb: FormBuilder , private Service:Service , private Router : Router ) { }

  ngOnInit() {

    this.regForm = this.fb.group({
      Sr:[''],
      Name: [''],
      Surname: [''],
      Nationality:[''],
      Contact:['']
    }) 
    
    this.getregister();
    
  }
 
  

   
  
  


  onSubmit = function(regForm: HTMLInputElement){
   
 alert("hey done")
   

  this.Service.employeeForm(regForm).subscribe(data => {
    console.log(data);
    if(data.status == 1){
      this.getregister();
    }
  });

}

new(){
  
  $('#insertArea').show()
}

 
getregister(){ 
  this.Service.getEmployeeForm().subscribe(Response => {
    console.log(Response);
    if(Response.status == "1"){
      $('#insertArea').hide()
      this.empList = Response.data;
       
    }
  });

}


edit(){
   this.updateregister();
}

updateregister(){ 
  this.Service.updateEmployeeForm().subscribe(Response => {
    console.log(Response);
    if(Response.status == "1"){
    
      this.empList = Response.data;
       
    }
  });

}








}



 

 