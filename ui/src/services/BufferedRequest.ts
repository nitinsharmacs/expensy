/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import BufferManager from './BufferManager';
import RequestLoop from './RequestLoop';
import Server from './Server';

const bufferAndStartLoop = (task: Function): Promise<Response> => {
  BufferManager.add(task);

  RequestLoop.start();

  return Promise.resolve(new Response());
};

class BufferedRequest {
  static async submit(task: Function): Promise<Response> {
    try {
      if (await Server.isSleeping()) {
        return bufferAndStartLoop(task);
      }

      return task();
    } catch (err) {
      return bufferAndStartLoop(task);
    }
  }
}

export default BufferedRequest;
