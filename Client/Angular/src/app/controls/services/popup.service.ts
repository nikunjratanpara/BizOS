import { ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, Injector } from '@angular/core';
export class PopupService<T> {
    private windowRef: ComponentRef<T>;
    private windowFactory: ComponentFactory<T>;
    constructor(private type: any,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewRef: ViewContainerRef,
        private injector: Injector
    ) {
        this.windowFactory = this.componentFactoryResolver.resolveComponentFactory<T>(type);
    }
    open(): ComponentRef<T> {
        if (!this.windowRef) {
            this.windowRef = this.viewRef.createComponent(this.windowFactory, 0, this.injector);
        }
        return this.windowRef;
    }
    close() {
        if (this.windowRef) {
            this.viewRef.remove(this.viewRef.indexOf(this.windowRef.hostView));
            this.windowRef = null;
        }
    }

}
