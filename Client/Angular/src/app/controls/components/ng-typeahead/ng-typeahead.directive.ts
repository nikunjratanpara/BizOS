import {
  Directive, ElementRef, OnInit,
  OnDestroy, Input,  HostListener, ViewContainerRef,
  NgZone, ComponentFactoryResolver, ComponentRef, Injector, Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadWindowComponent } from './typeahead.window.component';
import { Output, EventEmitter, forwardRef } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { Observable, BehaviorSubject, Subscription, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CatalogData, DataComboService, PositionService, Key } from '../../../biz-os-shared';


export interface TypeaheadSelectItemEvent {
  /**
   * An item about to be selected
   */
  item: any;

  /**
   * Function that will prevent item selection if called
   */
  preventDefault: () => void;
}


const TYPEAHEAD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgTypeaheadDirective),
  multi: true
};

@Directive({
  selector: '[typeahead]',
  providers: [TYPEAHEAD_VALUE_ACCESSOR]
})
export class NgTypeaheadDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  source: (value: Observable<string>) => Observable<Array<any>>;
  @Input()
  formatter: (comboItem: CatalogData) => string;
  @Input()
  catalogId: string;
  @Output()
  selectItem: EventEmitter<TypeaheadSelectItemEvent> = new EventEmitter<TypeaheadSelectItemEvent>();
  private popupService: PopupService<TypeaheadWindowComponent>;
  private _windowRef: ComponentRef<TypeaheadWindowComponent>;
  private _valueChanges: Observable<string>;
  private _resubscribeSource: BehaviorSubject<any>;
  private subscription: Subscription;
  private _userValue: string;
  private value: CatalogData;
  private positionService = new PositionService();
  private _onChange: (value: any) => void = (value: any) => { };
  private _onTouched: () => any = () => { };
 
  constructor(private el: ElementRef,
    private viewContainerReference: ViewContainerRef,
    private ngZone: NgZone,
    private injector: Injector,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver, private dataComboService: DataComboService) {
    this._resubscribeSource = new BehaviorSubject(null);
  }
  writeValue(value: CatalogData | string) {
    if (typeof (value) !== 'object') {
      if (!this.value || this.value.code !== value) {
        this.dataComboService.getCatalogData({
          catalogId: this.catalogId,
          filter: { showAll: false, term: value, searchCodeOnly: true, searchExact: true }
        }).subscribe(catalogData => {
          if (catalogData && catalogData.length) {
            this.value = catalogData[0];
            this.write();
          }
        });
      } else {
        this.write();
      }
    } else {
      this.value = value as CatalogData;
      this.write();
    }
  }
  write() {
    this.renderer.setProperty(this.el.nativeElement, 'value', this._formatItemForInput(this.value));
    if (this.value) {
      $(this.el.nativeElement).siblings('label').addClass('active');
    } else {
      $(this.el.nativeElement).siblings('label').removeClass('active');
    }
  }
  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  ngOnInit() {
    // create observable for user input on element.
    this._valueChanges = fromEvent(this.el.nativeElement, 'input', $event => $event.target.value);
    // call onChange registered function on Each Change
    const inputValues$: Observable<string> = this._valueChanges.pipe(
      tap( value =>  this._onChange(value))
    );
    // call passed api with user input and returns new observale with results.
    const results$ = this.source(inputValues$);
    // inputValues$.pipe(letProto.call(inputValues$, this.source);
    // assign results to behavior subject and returns new observable from behaviour subject.
    const processedResults$ = this._resubscribeSource.pipe(switchMap(() => results$)); 
    // const processedResults$ = switchMap.call(this._resubscribeSource, () => results$);
    this.subscription = this._subscribeToUserInput(processedResults$);

    this.popupService = new PopupService<TypeaheadWindowComponent>(TypeaheadWindowComponent,
      this.componentFactoryResolver,
      this.viewContainerReference,
      this.injector);

    this.ngZone.onStable.subscribe(() => {
      if (this.isPopupOpen()) {
        this.positionService.postionElememt(this.el.nativeElement, this._windowRef.location.nativeElement, 'bottom-left', true);
      }
    });

    // subscribe to processed result and return subscription which will be used to
    // unsubscribe while destroy.
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  @HostListener('blur')
  handleBlur() {
    this._resubscribeSource.next(null);
    this._onTouched();
  }

  @HostListener('keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (!this.isPopupOpen()) {
      return;
    }
    if (Key[event.which.toString()]) {
      switch (event.which) {
        case Key.ArrowDown:
          this._windowRef.instance.next();
          event.preventDefault();
          break;
        case Key.ArrowUp:
          this._windowRef.instance.prev();
          event.preventDefault();
          break;
        case Key.Escape:
          this._resubscribeSource.next(null);
          event.preventDefault();
          break;
        case Key.Tab:
        case Key.Enter:
          if (this._windowRef.instance.activeResult) {
            this._selectResult(this._windowRef.instance.activeResult);
            this._resubscribeSource.next(null);
          }
          if (Key.Enter === event.which) {
            event.preventDefault();
          }
          break;
      }
    }
  }
  private isPopupOpen(): boolean {
    return this._windowRef != null;
  }
  private _formatItemForInput(item: any): string {
    return item ? this.formatter ? this.formatter(item) : item : '';
  }
  private _subscribeToUserInput(userInput$: Observable<CatalogData[]>): Subscription {
    return userInput$.subscribe((results) => {
      this._windowRef = this.popupService.open();
      this._windowRef.instance.formatter = this.formatter;
      this._windowRef.instance.id = this.catalogId;
      this._windowRef.instance.activeIdx = -1;
      this._windowRef.instance.selectEvent.subscribe((result) => {
        this._selectResult(result);
      });
      this._windowRef.instance.dataset = results;
      // The observable stream we are subscribing to might have async steps
      // and if a component containing typeahead is using the OnPush strategy
      // the change detection turn wouldn't be invoked automatically.
      this._windowRef.changeDetectorRef.detectChanges();
      this.el.nativeElement.focus();
    });
  }

  private _selectResult(result: CatalogData) {
    let defaultPrevented = false;
    this.selectItem.emit({ item: result, preventDefault: () => { defaultPrevented = true; } });
    this._resubscribeSource.next(null);
    this.closePopup();

    if (!defaultPrevented) {
      this.writeValue(result);
      this._onChange(result);
    }
  }
  private closePopup() {
    this.popupService.close();
    this._windowRef = null;
  }
}
