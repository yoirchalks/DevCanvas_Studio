import { Component, computed, signal } from '@angular/core';

function countCharacterClasses(value: string): number {
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/];
  return classes.filter((pattern) => pattern.test(value)).length;
}

const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

@Component({
  selector: 'app-password-demo',
  imports: [],
  templateUrl: './password-demo.html',
  styleUrl: './password-demo.css',
})
export class PasswordDemo {
  protected readonly minLength = signal(8);
  protected readonly requireClasses = signal(3);

  protected readonly password = signal('');
  protected readonly repeatPassword = signal('');
  protected readonly touched = signal(false);
  protected readonly submitted = signal(false);

  protected readonly errorColor = signal('#ff4d4d');
  protected readonly tooShortMessage = signal('Password is too short');
  protected readonly notEnoughClassesMessage = signal('Needs more character variety');
  protected readonly mismatchMessage = signal("Passwords don't match");

  protected readonly classCount = computed(() => countCharacterClasses(this.password()));
  protected readonly meetsLength = computed(() => this.password().length >= this.minLength());
  protected readonly meetsClasses = computed(() => this.classCount() >= this.requireClasses());
  protected readonly passwordsMatch = computed(
    () => this.password().length > 0 && this.password() === this.repeatPassword(),
  );
  protected readonly isValid = computed(
    () => this.meetsLength() && this.meetsClasses() && this.passwordsMatch(),
  );

  protected onMinLengthInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.minLength.set(Math.min(32, Math.max(4, value)));
    }
  }

  protected onRequireClassesInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.requireClasses.set(Math.min(4, Math.max(1, value)));
    }
  }

  protected onPasswordInput(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
    this.touched.set(true);
  }

  protected onRepeatPasswordInput(event: Event): void {
    this.repeatPassword.set((event.target as HTMLInputElement).value);
    this.touched.set(true);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
  }

  protected onErrorColorInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (HEX_COLOR_PATTERN.test(value)) {
      this.errorColor.set(value);
    }
  }

  protected onTooShortMessageInput(event: Event): void {
    this.tooShortMessage.set((event.target as HTMLInputElement).value);
  }

  protected onNotEnoughClassesMessageInput(event: Event): void {
    this.notEnoughClassesMessage.set((event.target as HTMLInputElement).value);
  }

  protected onMismatchMessageInput(event: Event): void {
    this.mismatchMessage.set((event.target as HTMLInputElement).value);
  }
}
