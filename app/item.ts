import { Observable }     from 'rxjs/Observable';

export class Item {
  name: string;
  icon: string;
  actionUrl: string;
  statusUrl: string;
  status: string;
  statusObserver: Observable<any>;
}

