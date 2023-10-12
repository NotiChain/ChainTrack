import { installSnap, RequestOptions, SnapRequest } from '@metamask/snaps-jest';
import { expect } from '@jest/globals';
import { Monitor } from '../../shared/types';

let request: (_: RequestOptions) => SnapRequest;
let close: () => any;

async function resetStorage() {
  const resetResponse = request({
    method: 'reset',
  });

  const ui = await resetResponse.getInterface();
  expect(ui.type).toBe('confirmation');

  await ui.ok();

  expect((await resetResponse).response).toEqual({ result: null });
}

async function triggerCronjob() {
  const response = await request({
    method: 'trigger_cronjob',
  });
  expect(response.response).toEqual({ result: expect.anything() });
}

const testMonitors: Monitor[] = [
  {
    id: '1',
    network: '0x1',
    intervalHours: '24',
    intervalMs: 86400000,
    from: '0x0',
    to: '0x1',
  },
  {
    id: '2',
    network: '0x5',
    intervalHours: '12',
    intervalMs: 43200000,
    from: '0x1',
    to: '0x0',
  },
];

const errorneousResponse = {
  error: expect.objectContaining({
    code: -32603,
    message: 'Internal JSON-RPC error.',
  }),
};

describe('onRpcRequest', () => {
  beforeAll(async () => {
    const snap = await installSnap();
    request = snap.request;
    close = snap.close;
  });

  afterAll(async () => {
    await close();
  });

  afterEach(async () => {
    await resetStorage();
  });

  describe('get-monitors', () => {
    it('empty', async () => {
      const response = await request({
        method: 'get_monitors',
      });

      expect(response.response).toEqual({ result: [] });
    });

    it('with monitors', async () => {
      const monitors = testMonitors;
      for (const monitor of monitors) {
        const addResponse = await request({
          method: 'create',
          params: monitor,
        });
        expect(addResponse.response).toEqual({ result: null });
      }

      const getResponse = await request({
        method: 'get_monitors',
      });

      expect(getResponse.response).toEqual({ result: monitors });
    });
  });

  describe('get-alerts', () => {
    it('empty', async () => {
      const response = await request({
        method: 'get_alerts',
      });

      expect(response.response).toEqual({ result: [] });
    });

    it('with alerts', async () => {
      const monitors = testMonitors;
      for (const monitor of monitors) {
        const addResponse = await request({
          method: 'create',
          params: monitor,
        });
        expect(addResponse.response).toEqual({ result: null });
      }

      triggerCronjob();

      const getResponse = await request({
        method: 'get_alerts',
      });

      expect(getResponse.response).toEqual({ result: [] });
    });
  });

  describe('create', () => {
    it('create', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual({ result: null });

      const getResponse = await request({
        method: 'get_monitors',
      });

      expect(getResponse.response).toEqual({ result: [monitor] });
    });

    it('network is required', async () => {
      const monitor = {
        id: '1',
        intervalHours: '24',
        intervalMs: 86400000,
        from: '0x0',
        to: '0x1',
      };
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual(errorneousResponse);
    });

    it('from or to is required', async () => {
      const monitor = {
        id: '1',
        network: '0x1',
        intervalHours: '24',
        intervalMs: 86400000,
      };
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual(errorneousResponse);
    });

    it('interval is required', async () => {
      const monitor = {
        id: '1',
        network: '0x1',
        from: '0x0',
        to: '0x1',
      };
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual(errorneousResponse);
    });

    it('monitor exists', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual({ result: null });

      const response2 = await request({
        method: 'create',
        params: monitor,
      });

      expect(response2.response).toEqual(errorneousResponse);
    });
  });

  describe('reset', () => {
    it('reset', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual({ result: null });

      const getResponse = await request({
        method: 'get_monitors',
      });

      expect(getResponse.response).toEqual({ result: [monitor] });

      await resetStorage();

      const getResponse2 = await request({
        method: 'get_monitors',
      });

      expect(getResponse2.response).toEqual({ result: [] });
    });
  });

  describe('update', () => {
    it('update', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual({ result: null });

      const getResponse = await request({
        method: 'get_monitors',
      });

      expect(getResponse.response).toEqual({ result: [monitor] });

      const monitor2: Monitor = {
        id: '1',
        network: '0x5',
        intervalHours: '12',
        intervalMs: 43200000,
        from: '0x0',
        to: '0x1',
      };
      const response2 = await request({
        method: 'update_monitor',
        params: { item: monitor2 },
      });

      expect(response2.response).toEqual({ result: null });

      const getResponse2 = await request({
        method: 'get_monitors',
      });

      expect(getResponse2.response).toEqual({ result: [monitor2] });
    });

    it('empty update', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual({ result: null });

      const response2 = await request({
        method: 'update_monitor',
        params: {},
      });

      expect(response2.response).toEqual(errorneousResponse);
    });

    it('update not existing', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'update_monitor',
        params: { item: monitor },
      });

      expect(response.response).toEqual(errorneousResponse);
    });
  });

  describe('delete', () => {
    it('delete', async () => {
      const monitor = testMonitors[0];
      const response = await request({
        method: 'create',
        params: monitor,
      });

      expect(response.response).toEqual({ result: null });

      const response2 = await request({
        method: 'delete_monitor',
        params: monitor,
      });

      expect(response2.response).toEqual({ result: null });

      const getResponse2 = await request({
        method: 'get_monitors',
      });

      expect(getResponse2.response).toEqual({ result: [] });
    });

    it('empty delete', async () => {
      const response2 = await request({
        method: 'delete_monitor',
        params: {},
      });

      expect(response2.response).toEqual(errorneousResponse);
    });

    it('delete not existing', async () => {
      const monitor: Monitor = {
        id: '1',
        network: '0x1',
        intervalHours: '24',
        intervalMs: 86400000,
        from: '0x0',
        to: '0x1',
      };
      const response = await request({
        method: 'delete_monitor',
        params: monitor,
      });

      expect(response.response).toEqual(errorneousResponse);
    });
  });

  /*
  describe('get-user-stats', () => {
    it('get-user-stats', async () => {
      triggerCronjob();
      const response = await request({
        method: 'get_user_stats',
      });

      expect(response.response).toEqual({
        result: {
          snapAddedDate: expect.any(String),
          totalBackgroundChecks: 0,
          totalBackgroundRuns: 1,
        },
      });

      const monitors = testMonitors;
      for (const monitor of monitors) {
        const addResponse = await request({
          method: 'create',
          params: monitor,
        });
        expect(addResponse.response).toEqual({ result: null });
      }

      triggerCronjob();
      triggerCronjob();

      const getResponse = await request({
        method: 'get_user_stats',
      });

      expect(getResponse.response).toEqual({
        result: {
          snapAddedDate: expect.any(String),
          totalBackgroundChecks: 4,
          totalBackgroundRuns: 2,
        },
      });
    });
  });
  */
});
