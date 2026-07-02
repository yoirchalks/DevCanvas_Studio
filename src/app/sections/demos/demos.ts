import { Component } from '@angular/core';
import { AnimationDemo } from './animation-demo/animation-demo';
import { PasswordDemo } from './password-demo/password-demo';
import { SearchDemo } from './search-demo/search-demo';

@Component({
  selector: 'app-demos',
  imports: [AnimationDemo, PasswordDemo, SearchDemo],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
})
export class Demos {}
