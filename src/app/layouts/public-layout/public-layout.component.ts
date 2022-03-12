import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/core/services/dynamic.script.loader.service';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent implements OnInit {

  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) { }

  ngOnInit(): void {
    // Just call your load scripts function with scripts you want to load
    this.loadScripts();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('aos','bootstrap','swiper','email-validate').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}
