import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
//import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit/*, OnDestroy*/ {

	public subscription: Subscription;

  constructor() { 
  	

  	//obs.retry()  // me da error asi
  	this.subscription = this.regresaObservable()
  	.subscribe(
  		numero => console.log('Subs', numero),
  		error => console.log('Error en el obs', error),
  		() => console.log('El observador termino')
  	);

  }

  ngOnInit(): void {
  }

  /*
  ngOnDestroy(): void {
    //this.intervalSubs.unsubscribe();
    console.log('la pagina de va a cerrar');
    this.subscription.unsubscribe();
  }*/

  regresaObservable(): Observable<any>{
  	
  	return new Observable( observer => {

  		let contador = 0;

  		let intervalo = setInterval( () => {

  			contador += 1;

  			/*let salida = {
  				valor: contador
  			};

  			observer.next(salida);*/

  			observer.next(contador);

  			
  			if (contador === 3) {
  				clearInterval(intervalo);
  				observer.complete();
  			}

			/*
  			if (contador === 2) {
  				//clearInterval(intervalo);
  				observer.error('Auxilio');
  			}*/

  		}, 1000);
  	})/*.map((resp: any) => { // el operador map obtiene la respuesta, y la puede transformar en otra cosa
  		return resp.valor;
  	})*/

  	/*
  	.filter((valor, index) => { // el filter retorna un boolean
  		//console.log('Filter', valor);
  		//return true;
  		if ((valor % 2) === 1) { 
  			// impar
  			return true;
  		} else {
  			// par
  			return false;
  		}
  	})*/;

  }

}
