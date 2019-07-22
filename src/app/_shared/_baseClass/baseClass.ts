import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class BaseComponent implements OnDestroy {
    ngUnsubscribe = new Subject<void>();
    ngOnDestroy(): void {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}