import { Component, signal } from '@angular/core';

type Easing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

const EASING_OPTIONS: readonly Easing[] = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];

@Component({
  selector: 'app-animation-demo',
  imports: [],
  templateUrl: './animation-demo.html',
  styleUrl: './animation-demo.css',
})
export class AnimationDemo {
  protected readonly easingOptions = EASING_OPTIONS;
  protected readonly duration = signal(0.6);
  protected readonly easing = signal<Easing>('ease-in-out');
  protected readonly fromDeg = signal(0);
  protected readonly toDeg = signal(360);

  protected onDurationInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value) && value > 0) {
      this.duration.set(Math.min(10, Math.max(0.1, value)));
    }
  }

  protected onEasingChange(event: Event): void {
    this.easing.set((event.target as HTMLSelectElement).value as Easing);
  }

  protected onFromDegInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.fromDeg.set(Math.min(3600, Math.max(-3600, value)));
    }
  }

  protected onToDegInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.toDeg.set(Math.min(3600, Math.max(-3600, value)));
    }
  }
}
