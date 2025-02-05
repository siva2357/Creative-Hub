import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seeker-skills-page',
  templateUrl: './seeker-skills-page.component.html',
  styleUrls: ['./seeker-skills-page.component.css']
})
export class SeekerSkillsPageComponent {

  isTechnicalSkills : boolean = false;
  isLanguages : boolean = false;
  isSubjects : boolean = false;

  technicalSkillForm!: FormGroup;
  languageForm!: FormGroup;
  subjectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  

  ngOnInit(): void{
    this.initializeSkillForm();
    this.initializeLanguageForm();
  }


       initializeSkillForm() {
        this. technicalSkillForm = this.fb.group({
          _id: [null],
          skillSet: ['', [Validators.required]],
          proficiency: ['', [Validators.required]],
        });
      }

      initializeLanguageForm() {
        this.languageForm = this.fb.group({
          _id: [null],
          language: ['', [Validators.required]],
          proficiency: ['', [Validators.required]],
        });
      }



  saveSkills(){

  }

  saveLanguages(){

  }


}
