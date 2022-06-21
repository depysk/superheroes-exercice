import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../shared/models/hero';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-preview',
  templateUrl: './hero-preview.component.html',
  styleUrls: ['./hero-preview.component.scss'],
})
export class HeroPreviewComponent {
  @Input() hero: Hero;
  @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  onClose() {
    this.closePanel.emit();
  }

  onRefresh() {
    this.refresh.emit();
  }
}
