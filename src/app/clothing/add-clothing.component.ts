import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Clothing } from './clothing.model';
import { ClothingService } from './clothing.service';
import { AuthService } from '../auth/auth.service';
import * as imagepicker from '@nativescript/imagepicker';

@Component({
  selector: 'ns-add-clothing',
  templateUrl: './add-clothing.component.html',
})
export class AddClothingComponent {
  newClothing: Clothing = {
    id: '',
    name: '',
    size: '',
    condition: '',
    description: '',
    ownerName: '',
    ownerId: '',
    imageUrl: ''
  };
  imageAsset: any;
  imageUrl: string;

  constructor(
    private clothingService: ClothingService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  onSelectImage() {
    const context = imagepicker.create({
      mode: 'single'
    });

    context.authorize()
      .then(() => context.present())
      .then(selection => {
        this.imageAsset = selection[0];
        this.imageUrl = this.imageAsset.android || this.imageAsset.ios;
      })
      .catch(error => console.error('Error selecting image:', error));
  }

  onAddClothing(): void {
    const currentUser = this.authService.getCurrentUser();
    this.newClothing.ownerId = currentUser.uid;
    this.newClothing.ownerName = currentUser.email;

    if (this.imageAsset) {
      this.clothingService.uploadImage(this.imageAsset)
        .then(url => {
          this.newClothing.imageUrl = url;
          return this.clothingService.addClothing(this.newClothing);
        })
        .then(() => this.routerExtensions.navigate(['/clothing'], { clearHistory: true }))
        .catch(error => console.error('Error adding clothing:', error));
    } else {
      this.clothingService.addClothing(this.newClothing)
        .then(() => this.routerExtensions.navigate(['/clothing'], { clearHistory: true }))
        .catch(error => console.error('Error adding clothing:', error));
    }
  }
}