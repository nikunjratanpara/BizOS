export class PositionService {
     constructor() {}
        postionElememt(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean) {
            targetElement.style.top = (hostElement.offsetTop + hostElement.offsetHeight) + 'px';
            targetElement.style.left = (hostElement.offsetLeft) + 'px';
            targetElement.style.width = hostElement.clientWidth + 'px';
        }
 }

