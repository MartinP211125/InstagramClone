import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IPhoto } from './photo.model';
import { PhotoService } from './photo.service';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit  {
  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;
  photos: any[] = [];
  offset: number = 0;
  limit: number = 9;
  loading: boolean = false;
  constructor(private photoService: PhotoService, private router: Router, private ngZone: NgZone, private errorHandler: ErrorHandlerService) { }
  ngOnInit() {
    this.loadMorePhotos();
  }


  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1) && (y2 < 800)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.incrementOffset();
        this.addMorePhotos();
      })
    });
  }

  toggleLoading() {
    return this.loading = !this.loading;
  }

  loadMorePhotos() {
    this.toggleLoading();
    this.photoService.getPhotos(this.offset, this.limit).subscribe({
      next: (photos) => {
        this.photos = photos;
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
  }

  getDetails(photo: IPhoto) {
    this.router.navigate(['/details', JSON.stringify(photo)]);
  }

  addNewPhoto() {
    this.router.navigate(['/add']);
  }

  incrementOffset() {
    this.offset = this.offset + this.limit;
  }

  addMorePhotos() {
    this.photoService.getPhotos(this.offset, this.limit).subscribe({
      next: (photos) => {
        this.photos = [...this.photos, ...photos];
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
  }
}
