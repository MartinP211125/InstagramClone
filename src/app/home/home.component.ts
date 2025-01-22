import { AfterViewInit, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { IPhoto } from './photo.model';
import { PhotoService } from './photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  sortBy: string = "id";

  constructor(private photoService: PhotoService, private router: Router, private ngZone: NgZone, private errorHandler: ErrorHandlerService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      this.sortBy = params['sortBy'] ?? 'id';
    });
    this.loadMorePhotos();
  }


  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1) && (y2 < 800)),
      throttleTime(200),
      untilDestroyed(this)
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
    this.photoService.getPhotos(this.offset, this.limit, this.sortBy).pipe(untilDestroyed(this)).subscribe({
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
    this.photoService.getPhotos(this.offset, this.limit, this.sortBy).pipe(untilDestroyed(this)).subscribe({
      next: (photos) => {
        this.photos = [...this.photos, ...photos];
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
  }

  setSortBy(attribute: string): void {
    this.sortBy = attribute;
    this.offset = 0;
    this.photos = [];
    this.loadMorePhotos();
  }
}
