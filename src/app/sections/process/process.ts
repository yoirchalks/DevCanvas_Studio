import { Component } from '@angular/core';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-process',
  imports: [],
  templateUrl: './process.html',
  styleUrl: './process.css',
})
export class Process {
  protected readonly steps: readonly ProcessStep[] = [
    {
      step: 1,
      title: 'Meet',
      description:
        'We talk through your business, your customers, and what you need the site to do.',
    },
    {
      step: 2,
      title: 'Build',
      description: 'I take your requirements and build a working version of the site.',
    },
    {
      step: 3,
      title: 'Feedback',
      description: 'You review it, tell me what works and what doesn’t, no guesswork.',
    },
    {
      step: 4,
      title: 'Improve',
      description: 'I refine it based on your feedback, and we repeat until it’s right.',
    },
  ];
}
