import { NewEntryState } from '../screens/NewEntry/NewEntry';

class NewEntryService {
  static create(newEntry: NewEntryState): Promise<Response> {
    return fetch('/entry', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
  }
}

export default NewEntryService;
