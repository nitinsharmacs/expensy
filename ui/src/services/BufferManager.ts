class BufferManager {
  static add(key: string, item: any): void {
    const value = localStorage.getItem(key);

    if (!value) {
      return localStorage.setItem(key, JSON.stringify([item]));
    }

    const items = JSON.parse(value);

    items.push(item);

    localStorage.setItem(key, JSON.stringify(items));
  }

  static get(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  static clear(key: string): void {
    localStorage.setItem(key, '[]');
  }
}

export default BufferManager;
