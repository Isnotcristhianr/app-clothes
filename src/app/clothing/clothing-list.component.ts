import { Component, OnInit } from '@angular/core';
import { Clothing } from './clothing.model';
import { ClothingService } from './clothing.service';
import { AuthService } from '../auth/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-clothing-list',
  templateUrl: './clothing-list.component.html',
})
export class ClothingListComponent implements OnInit {
  clothingItems: Clothing[] = [];
  filteredClothingItems: Clothing[] = [];

  constructor(
    private clothingService: ClothingService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.clothingService.getClothing().subscribe(items => {
      this.clothingItems = items;
      this.filteredClothingItems = items;
    });
  }

  onSearch(args: any) {
    const searchValue = args.object.text.toLowerCase();
    this.filteredClothingItems = this.clothingItems.filter(item =>
      item.name.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue)
    );
  }

  onLogout() {
    this.authService.logout()
      .then(() => this.routerExtensions.navigate(['/login'], { clearHistory: true }))
      .catch(error => console.error('Logout error:', error));
  }
}