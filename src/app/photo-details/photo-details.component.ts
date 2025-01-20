import { Component, Input, OnInit } from '@angular/core';
import { IPhoto } from '../home/photo.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PhotoService } from '../home/photo.service';


@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
  standalone: false
})
export class PhotoDetailsComponent implements OnInit {
  photo!: IPhoto;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
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
      this.photoService.deletePhoto(JSON.stringify(this.photo.id)).subscribe({
        next: () => {
          console.log('Photo deleted successfully.');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/home']);
        }
      });

    }
  }
}
