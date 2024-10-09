import { Injectable } from '@angular/core';
import { Clothing } from './clothing.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClothingService {
  private clothingSubject = new BehaviorSubject<Clothing[]>([]);
  clothing$ = this.clothingSubject.asObservable();

  private clothingItems: Clothing[] = [
    { id: '1', name: 'Red T-Shirt', size: 'M', condition: 'Good', description: 'Comfortable cotton t-shirt', ownerName: 'Alice', ownerId: 'user1', imageUrl: 'https://example.com/red-tshirt.jpg' },
    { id: '2', name: 'Blue Jeans', size: '32', condition: 'Excellent', description: 'Barely worn denim jeans', ownerName: 'Bob', ownerId: 'user2', imageUrl: 'https://example.com/blue-jeans.jpg' },
  ];

  constructor() {
    this.clothingSubject.next(this.clothingItems);
  }

  getClothing(): Observable<Clothing[]> {
    return this.clothing$;
  }

  getClothingItem(id: string): Promise<Clothing> {
    const item = this.clothingItems.find(c => c.id === id);
    return Promise.resolve(item);
  }

  addClothing(item: Clothing): Promise<void> {
    item.id = (this.clothingItems.length + 1).toString();
    this.clothingItems.push(item);
    this.clothingSubject.next(this.clothingItems);
    return Promise.resolve();
  }

  uploadImage(imageAsset: any): Promise<string> {
    // Simulate image upload
    return Promise.resolve('https://example.com/uploaded-image.jpg');
  }
}