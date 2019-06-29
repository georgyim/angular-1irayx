import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SortService } from './sort.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: [ './sort.component.scss' ]
})
export class SortComponent implements OnInit, OnDestroy {

  @Input()
  sortProperty: string;

  @Output()
  sortEmitter: EventEmitter<any> = new EventEmitter<any>();

  direction: SortDirection = SortDirection.EMPTY;

  sortNotificationSubscription: Subscription;

  constructor(private sortService: SortService) {
  }

  ngOnInit() {
    this.sortNotificationSubscription = this.sortService.getSortNotificationObs()
      .subscribe((value: string) => {
        if (this.sortProperty !== value) {
          this.direction = SortDirection.EMPTY;
        }
      });
  }

  ngOnDestroy() {
    this.sortNotificationSubscription.unsubscribe();
  }

  isDownDirection(): boolean {
    return this.direction === SortDirection.DOWN;
  }

  isUpDirection(): boolean {
    return this.direction === SortDirection.UP;
  }

  sort(reverse = false) {
    this.sortEmitter.emit({ reverse, sortProperty: this.sortProperty });
    this.direction = reverse ? SortDirection.UP : SortDirection.DOWN;
  }

}

export enum SortDirection {

  UP,

  DOWN,

  EMPTY

}

export interface SortEvent {

  reverse: boolean;

  sortProperty: string;
}
