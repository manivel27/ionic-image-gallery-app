import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GalleryPage} from './pages/gallery/GalleryPage';

import {getProviders} from "./AppFactory";

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: getProviders()
})
export class MyApp {
  rootPage: any = GalleryPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
