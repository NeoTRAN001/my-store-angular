import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { File } from '../models/file.dto';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl: string = `${environment.API_URL}/api/files`;

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
      tap(content => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);

        map(() => true)
      })
    );
  }

  uploadFile(file: Blob): Observable<File> {
    const dto = new FormData()
    dto.append('file', file);

    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      //headers: {
      //  'Content-type': 'multipart/form-data'
      //}
    });
  }
}
