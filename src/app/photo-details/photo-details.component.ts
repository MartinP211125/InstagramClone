import { Component, Input, OnInit } from '@angular/core';
import { IPhoto } from '../home/photo.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PhotoService } from '../home/photo.service';
import { ErrorHandlerService } from '../error-handler.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
  standalone: false
})
export class PhotoDetailsComponent implements OnInit {
  photo!: IPhoto;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private photoService: PhotoService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.activeRoute.paramMap.pipe(untilDestroyed(this)).subscribe(params => {
      const photoParams = params.get("photo");
      if (photoParams) {
        this.photo = JSON.parse(photoParams);
      }
    });
  }

    editPhoto(): void {
      this.router.navigate(['/edit', JSON.stringify(this.photo.id)]);
    }

  deletePhoto(): void {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.photoService.deletePhoto(JSON.stringify(this.photo.id)).pipe(untilDestroyed(this)).subscribe({
        error: (err) => {
          this.errorHandler.handleError(err);
        },
        complete: () => {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
