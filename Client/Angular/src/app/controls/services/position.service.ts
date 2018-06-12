import { CommonModule } from '@angular/common';
import { element } from 'protractor';
import { ElementRef } from '@angular/core';
 class Position {
     constructor() {}
        postionElememt(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean) {
            targetElement.style.top = (hostElement.offsetTop + hostElement.offsetHeight) + 'px';
            targetElement.style.left = (hostElement.offsetLeft) + 'px';
            targetElement.style.width = hostElement.clientWidth + 'px';
        }
 }
 export const positionService = new Position();
