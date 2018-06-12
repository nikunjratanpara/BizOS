import {
  Directive, Renderer2, ElementRef, HostListener, OnInit,
  OnDestroy, ViewContainerRef, Injector, ComponentFactoryResolver
} from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { DatetimeWindowComponent } from './datetime.window.component';
import { element } from 'protractor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgDatetime, IDatetimePickerOptions } from './datetime.struct';
import { NgbPeriod, CalendarService } from './calender.service';
import { Observable } from 'rxjs/Observable';
import { Input, ComponentRef, forwardRef } from '@angular/core';
import { Subscription } from 'rxjs/subscription';
import { Key } from '../../models/common.enums';
import { toString, isValidDate, formatDate, createJSDateFromString } from '../../utils/util';
import { _do } from 'rxjs/operator/do';
import { fromEvent } from 'rxjs/observable/fromEvent';

const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgDatetimeDirective),
  multi: true
};

@Directive({
  selector: 'input[datetime]',
  providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class NgDatetimeDirective implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  toggelOpen: Observable<boolean>;
  @Input()
  config: IDatetimePickerOptions;
  @Input()
  value: Date;
  popupService: PopupService<DatetimeWindowComponent>;
  private _valueChanges: Observable<string>;
  private _userValue: string;
  private _windowRef: ComponentRef<DatetimeWindowComponent>;
  private subscription: Subscription;
  private _onChange: (value: any) => void = (value: any) => { };
  private _onTouched: () => any = () => { };

  constructor(private element: ElementRef,
    private viewContainerReference: ViewContainerRef,
    private injector: Injector,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  @HostListener('blur')
  handleBlur() {
     if (this._userValue && isValidDate(this._userValue, this.config.displayFormat)) {
       const jsDate = createJSDateFromString(this._userValue, this.config.displayFormat);
        this._onChange(jsDate);
        this.writeValue(jsDate);
     } else {
        this._onChange(null);
        this.writeValue('');
     }
     this.closePopup();
  }
  @HostListener('keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent) {
    if (Key[toString(event.which)]) {
      switch (event.which) {
        case Key.PageUp:
          this._windowRef.instance.focusMove(event.shiftKey ? 'y' : 'm', -1);
          break;
        case Key.PageDown:
          this._windowRef.instance.focusMove(event.shiftKey ? 'y' : 'm', 1);
          break;
        case Key.End:
          this._windowRef.instance.moveEnd(event.shiftKey ? this.config.maxDate : undefined);
          break;
        case Key.Home:
          this._windowRef.instance.moveHome(event.shiftKey ? this.config.minDate : undefined);
          break;
        case Key.ArrowLeft:
          this._windowRef.instance.focusMove('d', -1);
          break;
        case Key.ArrowUp:
          this._windowRef.instance.prevWeek();
          break;
        case Key.ArrowRight:
          this._windowRef.instance.focusMove('d', 1);
          break;
        case Key.ArrowDown:
          if (this.isPopupOpen()) {
            this._windowRef.instance.nextWeek();
          } else {
            this.openPopup();
          }
          break;
        case Key.Enter:
        case Key.Space:
          this._windowRef.instance.focusSelect();
          break;
        case Key.Today:
          this.onDateSelect(NgDatetime.today);
          break;
        case Key.Escape:
          this.closePopup();
          break;
        default:
          return;
      }

      event.preventDefault();
      event.stopPropagation();
    }
  }
  ngOnInit() {
    this.popupService = new PopupService<DatetimeWindowComponent>(DatetimeWindowComponent,
      this.componentFactoryResolver,
      this.viewContainerReference,
      this.injector);
    this.subscription = this.toggelOpen.subscribe(isOpen => {
      if (isOpen && !this.isPopupOpen()) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    });

    this._valueChanges = fromEvent(this.element.nativeElement, 'input', $event =>  $event.target.value);
    // call onChange registered function on Each Change
    this._valueChanges.subscribe(value => {
      console.dir(value);
      this._userValue = value;
      this._onChange(value);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  writeValue(value: string | Date) {
    if (value) {
      if (typeof (value) === 'string') {
        value = new Date(value);
      }
      this.value = value;
      this.renderer.setProperty(this.element.nativeElement, 'value', NgDatetime.fromJSDate(value).format(this.config.displayFormat));
    } else {
      this.renderer.setProperty(this.element.nativeElement, 'value', '');
    }
  }
  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  private isPopupOpen() {
    return !!this._windowRef;
  }
  private openPopup() {
    if (!this.isPopupOpen()) {
      this.element.nativeElement.focus();
      this._windowRef = this.popupService.open();
      this._windowRef.instance.selectItem.subscribe((selectedDate: NgDatetime) => {
        this.onDateSelect(selectedDate);
      });
      this._windowRef.instance.config = this.config;
      this._windowRef.instance.currentSelected = NgDatetime.fromJSDate(this.value);
    }
  }
  private onDateSelect(selectedDate: NgDatetime) {
    const jsDate = NgDatetime.toJSDate(selectedDate);
    this._userValue = formatDate(jsDate, this.config.displayFormat);
    this._onChange(jsDate);
    this.writeValue(jsDate);
    this.closePopup();
  }
  private closePopup() {
    if (this.isPopupOpen()) {
      this.popupService.close();
      this._windowRef = null;
    }
  }
}
