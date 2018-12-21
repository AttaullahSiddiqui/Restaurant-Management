import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private storage: AngularFireStorage) { }

  upload(imageFile, filePath) : Observable<any>{
    return new Observable(observer => {
      const file = imageFile;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
          finalize(() => {
           let fileUrl = fileRef.getDownloadURL();
           observer.next(fileUrl);
          })
      )
    })
  }

}
