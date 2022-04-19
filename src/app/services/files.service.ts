import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

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
}
