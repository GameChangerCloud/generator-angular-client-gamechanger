import { camelize } from '@angular-devkit/core/src/utils/strings';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GamechangerParserService } from 'src/app/module/gamechanger-admin/services/gamechanger-parser.service';
import { EmployeService } from 'src/app/store/service/employe.service';
import { WorkService } from 'src/app/store/service/work.service';
import { QuestionBase } from '../../models/questions/question-base';
import { QuestionControlService } from '../../service/question-control.service';
import { QuestionService } from '../../service/question.service';

@Component({
  selector: 'gamechanger-dynamic-form',
  templateUrl: './gamechanger-dynamic-form.component.html',
  styleUrls: ['./gamechanger-dynamic-form.component.scss']
})
export class GamechangerDynamicFormComponent implements OnInit {

  
  @Input() type!: 'update' | 'add';
  @Input() entity!:any;
  questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  questions$!: Observable<QuestionBase<any>[]>;
  activeEntity:string | null ;

  constructor(
    private route: ActivatedRoute,
    private qcs: QuestionControlService, 
    private qs: QuestionService, 
    private schemaTypes: GamechangerParserService,

     
    private employeService : EmployeService,
     
    private workService : WorkService,
     
    // private employeService: EmployeService,
    // private workService: WorkService
    // GENERATED : private <entity_name>Service: <entity_name>Service,

  ){
    this.activeEntity = this.route.snapshot.paramMap.get('model');
  }

  ngOnInit() {
    this.questions$ = this.qs.getQuestions(this.schemaTypes.getSchemaTypes(),this.type,this.entity);
    let types = this.schemaTypes.getSchemaTypes()
    this.questions$.subscribe(questions=>{
      this.questions = questions
      this.form = this.qcs.toFormGroup(questions as QuestionBase<string>[]);
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.addEntitie(this.payLoad)
  }

  addEntitie(entity:any): void {
    // GENERATED TODO : BIND <ENTITY-NAME> TO USE RIGHT ENTITY SERVICE
    eval(`this.employeService.add(${entity});`)  
  }

}
