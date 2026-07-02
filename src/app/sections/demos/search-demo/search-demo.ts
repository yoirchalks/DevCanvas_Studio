import { Component, computed, signal } from '@angular/core';
import { debounce } from '../debounce';

interface ServiceItem {
  title: string;
  description: string;
}

const INITIAL_SERVICES: readonly ServiceItem[] = [
  { title: 'Custom Website Build', description: 'A site designed and coded around your business.' },
  { title: 'SEO Audit', description: "Find out why search engines can't find you." },
  { title: 'Performance Tuning', description: 'Faster load times, fewer lost visitors.' },
  { title: 'Security Hardening', description: 'Lock down forms, auth, and data handling.' },
  { title: 'Mobile Responsive Refresh', description: 'Make an old site work on phones.' },
  { title: 'Ongoing Maintenance', description: 'Monthly updates, backups, and fixes.' },
];

@Component({
  selector: 'app-search-demo',
  imports: [],
  templateUrl: './search-demo.html',
  styleUrl: './search-demo.css',
})
export class SearchDemo {
  protected readonly delayMs = signal(300);
  protected readonly query = signal('');
  protected readonly debouncedQuery = signal('');

  protected readonly services = signal<readonly ServiceItem[]>(INITIAL_SERVICES);

  protected readonly newTitle = signal('');
  protected readonly newDescription = signal('');

  private readonly runDebounced = computed(() =>
    debounce((value: string) => this.debouncedQuery.set(value), this.delayMs()),
  );

  protected readonly results = computed(() => {
    const q = this.debouncedQuery().trim().toLowerCase();
    const list = this.services();
    if (!q) return list;
    return list.filter((item) => item.title.toLowerCase().includes(q));
  });

  protected onDelayInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.delayMs.set(Math.min(2000, Math.max(0, value)));
    }
  }

  protected onQueryInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.runDebounced()(value);
  }

  protected onNewTitleInput(event: Event): void {
    this.newTitle.set((event.target as HTMLInputElement).value);
  }

  protected onNewDescriptionInput(event: Event): void {
    this.newDescription.set((event.target as HTMLInputElement).value);
  }

  protected onInsert(event: Event): void {
    event.preventDefault();
    const title = this.newTitle().trim();
    const description = this.newDescription().trim();
    if (!title || !description) return;

    this.services.update((list) => [...list, { title, description }]);
    this.newTitle.set('');
    this.newDescription.set('');
  }

  protected onRefresh(): void {
    this.services.set(INITIAL_SERVICES);
    this.query.set('');
    this.debouncedQuery.set('');
    this.newTitle.set('');
    this.newDescription.set('');
  }
}
