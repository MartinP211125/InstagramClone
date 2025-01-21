import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PhotoService } from '../home/photo.service';
import { IPhoto } from '../home/photo.model';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-edit-photo-form',
  templateUrl: './edit-photo-form.component.html',
  styleUrls: ['./edit-photo-form.component.css'],
  standalone: false
})
export class EditPhotoFormComponent implements OnInit {
  photoForm!: FormGroup
  photo!: IPhoto
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private photoService: PhotoService, private router: Router, private errorHandler: ErrorHandlerService) {
    this.photoForm = this.fb.group({
      albumId: [null, [Validators.required, Validators.min(1)]],
      id: [null, [Validators.required, Validators.min(1)]],
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      thumbnailUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const photoParams = params.get("id");
      if (photoParams) {
        let photoId = JSON.parse(photoParams);
        this.loadPhoto(photoId);
      }
    });
   }

  loadPhoto(photoId: number) {
    this.photoService.getPhoto(photoId.toString()).subscribe((photo) => {
      this.photo = photo;

      this.photoForm.patchValue({
        albumId: this.photo.albumId,
        title: this.photo.title,
        url: this.photo.url,
        thumbnailUrl: this.photo.thumbnailUrl,
        id: this.photo.id
      });
    });
  }

  onSubmit(): void {
    if (this.photoForm.valid) {
      this.photoService.updatePhoto(JSON.stringify(this.photo.id), this.photoForm.value).subscribe({
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/edit', this.photo.id]);
    }
  }

}
