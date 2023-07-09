import { ErrorMapper } from '../interfaces/errorMapper.interface';

export const errorMapper = (): ErrorMapper => {
  return {
    toResponse(err) {
      return {
        kind: err.kind,
        message: err.message
      };
    }
  };
};
