import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';

@Injectable()
export class LoadingService {
    private _isLoading = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this._isLoading.asObservable();

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
            tap(() => this.loadingOn()),
            concatMap(() => obs$),
            finalize(() => this.loadingOff())
        );
    }

    loadingOn() {
        this._isLoading.next(true);
    }

    loadingOff() {
        this._isLoading.next(false);
    }
}
