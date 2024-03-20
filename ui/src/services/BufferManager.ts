/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
class BufferManager {
  private static items: Function[] = [];
  // static add(key: string, item: any): void {
  //   const value = localStorage.getItem(key);

  //   if (!value) {
  //     return localStorage.setItem(key, JSON.stringify([item]));
  //   }

  //   const items = JSON.parse(value);

  //   items.push(item);

  //   localStorage.setItem(key, JSON.stringify(items));
  // }

  static add(item: Function) {
    BufferManager.items.push(item);
  }

  // static get(key: string): any[] {
  //   return JSON.parse(localStorage.getItem(key) || '[]');
  // }

  static getAll(): Function[] {
    const tasks = BufferManager.items;
    BufferManager.items = [];
    return tasks;
  }

  // static clear(key: string): void {
  //   localStorage.setItem(key, '[]');
  // }

  static clear(): void {
    //
  }
}

export default BufferManager;

// [
//   [Function, args],
//   [Function, args],
// ];
