import { Component, signal } from '@angular/core';

interface ProblemSolution {
  tag: string;
  problem: string;
  solution: string;
}

const PROBLEM_SOLUTIONS: readonly ProblemSolution[] = [
  {
    tag: 'SEO',
    problem:
      '"My site looks great, but it\'s buried on page 3 of Google — customers can\'t find me even searching my own business name."',
    solution:
      'Solid metadata, semantic and accessible markup, and server-side rendering with hydration so search engines can actually crawl and index your content, not just a blank shell.',
  },
  {
    tag: 'Security',
    problem:
      '"I\'m scared to collect customer info on my site — I don\'t know what happens if it gets hacked."',
    solution:
      'Hashed credentials, secrets kept out of the codebase entirely, parameterized queries so there\'s no SQL injection surface, regular password rotation, and least-privilege access for every account and service.',
  },
  {
    tag: 'Performance',
    problem:
      '"My site takes 6+ seconds to load on mobile — I\'m losing visitors before they even see what I sell."',
    solution: 'Lazy loading so the browser only fetches what\'s needed, plus a caching strategy so repeat visits are fast.',
  },
  {
    tag: 'Conversion',
    problem: '"Visitors look around and leave without buying or contacting me."',
    solution:
      'Deliberate visuals and color scheme, and a layout that\'s clearly compartmentalized — so visitors instantly understand where to look and what to do next.',
  },
  {
    tag: 'Handoff',
    problem:
      '"My last developer built my site, then disappeared — now I\'m afraid to touch anything."',
    solution:
      'Every handoff starts with a full audit: documenting what the code does in plain English, so you always have a clear map of what you own, even if I\'m not the one making the next change.',
  },
  {
    tag: 'Mobile',
    problem: '"Half my customers are on their phones, but my site was clearly built for desktop first."',
    solution:
      'Responsive layouts driven by media queries, and where a native-app feel matters more than a browser tab, the option to package the same app with Capacitor for the app stores.',
  },
];

@Component({
  selector: 'app-innovation',
  imports: [],
  templateUrl: './innovation.html',
  styleUrl: './innovation.css',
})
export class Innovation {
  protected readonly featured = signal<readonly ProblemSolution[]>(
    [...PROBLEM_SOLUTIONS].sort(() => Math.random() - 0.5).slice(0, 3),
  );
}
