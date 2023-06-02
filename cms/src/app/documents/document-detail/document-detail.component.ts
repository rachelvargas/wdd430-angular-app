import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private windRefService: WindRefService){
      this.nativeWindow = windRefService.getNativeWindow();
     }


  ngOnInit(){
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        //this.id = params.['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );

    this.nativeWindow = this.windRefService.getNativeWindow();
    
  }
  
  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }
  onView(){
    if (this.document.url){
      this.nativeWindow.open(this.document.url);
    }

  }

}
