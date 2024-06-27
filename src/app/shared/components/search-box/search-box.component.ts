import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private dbouncer: Subject<string> = new Subject<string>();
  private dbouncerSubscription?: Subscription;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.dbouncerSubscription = this.dbouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.dbouncer.unsubscribe();
  }

  emitValue( value: string ): void {
    this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ) {
    this.dbouncer.next( searchTerm );
  }

}
