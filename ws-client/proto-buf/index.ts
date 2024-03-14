import { pbbp2 } from './pbbp2';

export const decode = (buffer: Uint8Array) => {
  return pbbp2.Frame.decode(buffer);
}

export const encode = (data: pbbp2.IFrame) => {
  return pbbp2.Frame.encode(data);
}