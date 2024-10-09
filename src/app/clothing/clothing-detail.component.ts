import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clothing } from './clothing.model';
import { ClothingService } from './clothing.service';
import { RouterExtensions } from '@nativescript/angular';
import { alert } from '@nativescript/core';

@Component({
  selector: 'ns-clothing-detail',
  templateUrl: './clothing-detail.component.html',
})
export class ClothingDetailComponent implements OnInit {
  clothing: Clothing;

  constructor(
    private clothingService: ClothingService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.clothingService.getClothingItem(id).then(item => {
      this.clothing = item;
    });
  }

  onRequestExchange(): void {
    alert({
      title: 'Exchange Requested',
      message: `You have requested to exchange ${this.clothing.name} from ${this.clothing.ownerName}. They will be notified of your interest.`,
      okButtonText: 'OK'
    });
  }

  onChatWithOwner(): void {
    this.routerExtensions.navigate(['/chat', this.clothing.ownerId]);
  }
}