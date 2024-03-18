import { NewEntryState } from '../screens/NewEntry/NewEntry.types';
import BufferManager from './BufferManager';
import CashflowAPIService from './CashflowAPIService';
import CashflowLoop from './CashflowLoop';
import Server from './Server';

const bufferAndStartLoop = (newEntry: NewEntryState): Promise<Response> => {
  BufferManager.add('entries', newEntry);

  CashflowLoop.start();

  return Promise.resolve(new Response());
};

class CashflowService {
  static async create(newEntry: NewEntryState): Promise<Response> {
    try {
      if (await Server.isSleeping()) {
        return bufferAndStartLoop(newEntry);
      }

      return CashflowAPIService.postEntry(newEntry);
    } catch (err) {
      return bufferAndStartLoop(newEntry);
    }
  }
}

export default CashflowService;
