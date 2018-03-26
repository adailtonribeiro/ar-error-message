import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {trigger, state, transition, style, animate} from "@angular/animations";
import {Events} from "ionic-angular";

const HTML_TEMPLATE = `<div [@fadeIn] [@fadeOut]="fadeOutEffect" class="ar-error-message">
  <p [ngStyle]="{'display':fadeOutEffect == 'hidden' ? 'none' : 'block' }">{{message}}</p>
</div>`;

const CSS_STYLE = `
.ar-error-message {
    width: 100%;
    min-height: 40px;
    background-color: #f2dede;
    transition: all 0.3s;
    p {
      font-size: 1em;
      padding: 10px 15px;
      margin-top: 0;
    }
}`;

@Component({
    selector: 'ar-error-message',
    template: HTML_TEMPLATE,
    styles: [CSS_STYLE],
    animations: [
        trigger('fadeIn', [
            state('void', style({opacity: '0'})),
            state('*', style({opacity: '1'})),
            transition('void <=> *', animate('750ms ease-in'))
        ]),
        trigger('fadeOut', [
            //state('*', style({'min-height': '40px'})),
            state('hidden', style({'min-height': '0'})),
            transition('* => *', animate('500ms ease-in'))
        ])
    ]
})
export class ArErrorMessageComponent implements OnInit, OnDestroy {

    autoHide: boolean = false;
    fadeOutEffect: string;
    @Input('autoScroll') autoScroll: boolean = true;
    @Input('message') message: string = '';

    @Input('autoHide') set setAutoHide(autoHide) {
        this.autoHide = autoHide;
        if (autoHide) {
            this.triggerHideComponent();
        }
    };

    constructor(public elRef: ElementRef, public events: Events) {
    }

    ngOnInit() {
        if (this.autoScroll) {
            this.scrollToComponent();
        }
        this.events.subscribe('form-submit-failed', () => {
            if (this.autoScroll) {
                this.scrollToComponent();
            }
            if (this.autoHide) {
                this.fadeOutEffect = 'void';
                this.triggerHideComponent();
            }
        });

    }

    ngOnDestroy() {
        this.events.unsubscribe('form-submit-failed');
    }

    triggerHideComponent() {
        setTimeout(() => {
            this.fadeOutEffect = 'hidden';
            //this.message = '';
        }, 5000);
    }

    scrollToComponent() {
        this.elRef.nativeElement.scrollIntoView({behavior: "smooth"});
    }

}
