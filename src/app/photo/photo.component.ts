import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPhoto } from '../home/photo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  standalone: false
})
export class PhotoComponent {
  @Input() photo!: IPhoto;
  @Input() image!: string;
  @Output() details = new EventEmitter();
  constructor(private router: Router) { }

  showDetails() {
    this.details.emit(this.photo);
  }
}
