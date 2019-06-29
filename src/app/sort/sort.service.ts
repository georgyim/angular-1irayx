import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  public sortNotificationSubject: Subject<string> = new Subject();

  constructor() {
  }

  public getSortNotificationObs(): Observable<string> {
    return this.sortNotificationSubject.asObservable();
  }

  public orderBy<T>(array: any[], prop: string, reverse?: boolean): T[] {
    const propType = typeof array[ 0 ][ prop ];
    let sortedArray;
    switch (propType) {
      case 'string':
        sortedArray = array.sort((a, b) => {
          const itemA = a[ prop ].toLowerCase();
          const itemB = b[ prop ].toLowerCase();
          if (!reverse) {
            if (itemA < itemB) {
              return -1;
            }
            if (itemA > itemB) {
              return 1;
            }
            return 0;
          } else {
            if (itemA > itemB) {
              return -1;
            }
            if (itemA < itemB) {
              return 1;
            }
            return 0;
          }
        });
        break;
      case 'number':
        sortedArray = array.sort((a, b) => {
          const itemA = a[ prop ];
          const itemB = b[ prop ];
          return !reverse ? itemA - itemB : itemB - itemA;
        });
        break;
      default:
        sortedArray = array;
    }
    this.sortNotificationSubject.next(prop);
    return sortedArray;
  }
}
