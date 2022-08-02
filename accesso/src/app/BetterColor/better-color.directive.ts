import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterColor]'
})
export class BetterColorDirective implements OnInit{

  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';


  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  
   ngOnInit(): void {
       this.renderer.setStyle(this.elRef.nativeElement, 'text-align' , 'center')
       this.renderer.setStyle(this.elRef.nativeElement, 'margin' , '0 auto')
       this.renderer.setStyle(this.elRef.nativeElement, 'margin-top' , '3pc')
    }
}