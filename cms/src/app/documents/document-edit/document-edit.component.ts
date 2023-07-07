import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  originalDocument: Document;
  document: Document;
  id: string;
  editMode: boolean = false;
  //documentForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private documentService: DocumentService,
              private router: Router){

  }
  ngOnInit(){
    this.route
    .params
    .subscribe(
      (params: Params) => {
        if (!this.id){
         this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(this.id);
      
      if(!this.originalDocument){
      return;
    }
    this.editMode = true;
    this.document = JSON.parse(JSON.stringify(this.originalDocument))
    //this.document.slice();
    //return this.contacts.slice();
  
  });
      
}

onSubmit(form: NgForm) {
  const value = form.value;
  const newDocument = new Document(
    '',
    '',
    value.name,
    value.description,
    value.url,
    value.children
  );
  /**public id: string,
        public name: string,
        public description:string,
        public url: string,
        public children: Document[] */

  if (this.editMode){
    this.documentService.updateDocument(this.originalDocument, newDocument);
  } else {
    this.documentService.addDocument(newDocument);
  }
  this.router.navigateByUrl('documents');
}


  onCancel(){
    //this.documentService.cancelDocument(this.document);
    this.router.navigateByUrl('/documents');
  }

}
