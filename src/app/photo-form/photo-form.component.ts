import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../home/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
  standalone: false
})
export class PhotoFormComponent {
  photoForm!: FormGroup;

  constructor(private fb: FormBuilder, private photoService: PhotoService, private router: Router) {
    this.photoForm = this.fb.group({
      albumId: [1, [Validators.required, Validators.min(1)]],
      id: [1, [Validators.required, Validators.min(1)]],
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      thumbnailUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  onSubmit(): void {
    if (this.photoForm.valid) {
      console.log("form is valid");
      this.photoService.addPhoto(this.photoForm.value).subscribe({
        error: (err) => console.log(err),
        complete: () => console.log("photo added.")
      });
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/add']);
    }
  }

}
