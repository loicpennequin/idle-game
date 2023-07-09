import { contract } from '@daria/shared';
import { initClient } from '@ts-rest/core';
import { FetchError, ofetch } from 'ofetch';
import type { ApiClient } from './interfaces/container';

export const apiClient: ApiClient = initClient(contract, {
  baseUrl: 'http://localhost:5000',
  baseHeaders: {},
  api: async args => {
    try {
      const resp = await ofetch.raw(args.path, {
        method: args.method,
        headers: args.headers,
        body: args.rawBody as any,
        query: args.rawQuery as any,
        credentials: args.credentials,
        signal: args.signal
      });

      return {
        status: resp.status,
        headers: resp.headers,
        body: resp._data
      };
    } catch (e) {
      const err = e as FetchError;
      return {
        status: err.status ?? 500,
        body: err.data,
        headers: err.response?.headers ?? new Headers()
      };
    }
  }
});
