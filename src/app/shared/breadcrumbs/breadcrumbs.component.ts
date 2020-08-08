import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router, public meta: Meta) { 
  		/*
	  this.getDataRoute()
	  	  .subscribe(data =>{
	  	  	console.log(data);
	  	  });*/

	this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe( ({ titulo }) => {
                            this.titulo = titulo;
                            document.title = `${ titulo }`;

                            // meta
                            let metaTag: MetaDefinition = {
                              name:'description',
                              content: this.titulo
                            }
                            this.meta.updateTag(metaTag);
                        });

  }

  ngOnInit(): void {
  }

  /*
  getDataRoute(){
  	this.router.events
  		.pipe(
	        filter( event => event instanceof ActivationEnd ),
	        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
	        map( (event: ActivationEnd) => event.snapshot.data ),
	        
	    );
  }*/


  getArgumentosRuta() {

    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }

}
