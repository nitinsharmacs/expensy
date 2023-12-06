import { RecentEntryItemProps } from '../components/RecentEntryItem/RecentEntryItem';
import { Category, NewEntryState } from '../screens/NewEntry/NewEntry';

class CashflowService {
  static create(newEntry: NewEntryState): Promise<Response> {
    return fetch('/api/entry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newEntry),
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
      .then((res) => res.json());
  }
}

export default CashflowService;
