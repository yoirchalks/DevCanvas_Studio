import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './sections/hero/hero';
import { Process } from './sections/process/process';
import { Demos } from './sections/demos/demos';
import { Innovation } from './sections/innovation/innovation';
import { Portfolio } from './sections/portfolio/portfolio';
import { Contact } from './sections/contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Hero, Process, Demos, Innovation, Portfolio, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
