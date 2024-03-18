import { RecentEntryItemProps } from '../components/RecentEntryItem/RecentEntryItem';
import { Category, NewEntryState } from '../screens/NewEntry/NewEntry.types';

class CashflowAPIService {
  static postEntry(newEntry: NewEntryState): Promise<Response> {
    return fetch('/api/entry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
  }

  static postEntries(entries: NewEntryState[]): Promise<Response> {
    return fetch('/api/entries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(entries),
    });
  }

  static fetchCategories(): Promise<Category[]> {
    return fetch('/api/categories')
      .then((res) => {
        if (res.status !== 200) {
          return { categories: [] };
        }

        return res.json();
      })
      .then((res) => res.categories);
  }

  static getRecentEntries(): Promise<RecentEntryItemProps[]> {
    return fetch('/api/recent-entries')
      .then((res) => {
        if (res.status !== 200) {
          return { entries: [] };
        }

        return res.json();
      })
      .then((res) => res.entries);
  }
}

export default CashflowAPIService;
