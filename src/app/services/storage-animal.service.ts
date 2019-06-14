import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';

const ITEMS_KEY = 'argen-items';

@Injectable({
  providedIn: 'root'
})
export class StorageAnimalService {

  constructor(private storage: Storage) { }

  addItem(item: any) {
    this.storage.set(ITEMS_KEY, item);
  }

  getItem() {
    return this.storage.get(ITEMS_KEY);
  }

}