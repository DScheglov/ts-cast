import {
  prod, struct, record, number, string,
} from '../..';
import { any } from '../any';

describe('prod', () => {
  const Point = struct({
    x: number,
    y: number,
  }, 'Point');

  const Address = struct({
    city: string,
    street: string,
    zip: string,
  }, 'Address');

  const AnyRecord = record(string, any);

  const Geo = prod(Point, Address);

  const GeoExt = prod(AnyRecord, Geo);

  it('Geo.name === "Point & Address"', () => {
    expect(Geo.name).toBe('Point & Address');
  });

  it('GeoExt.name = Record<string, any> & Point & Address', () => {
    expect(GeoExt.name).toBe('Record<string, any> & Point & Address');
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('Geo.%s is a Function', methodName => {
      expect((Geo as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  it.each([
    [{
      x: 1, y: 2, city: 'Kyiv', street: 'Khreshchatyk', zip: '01000',
    },
    {
      city: 'Kyiv', street: 'Khreshchatyk', zip: '01000', x: 1, y: 2,
    }],
  ])('Geo bypasses %j', value => {
    expect(Geo(value)).toEqual(value);
  });

  it.each([
    [{
      x: 1, y: 2, city: 'Kyiv', street: 'Khreshchatyk', zip: '01000', tag: 1,
    },
    {
      city: 'Kyiv', street: 'Khreshchatyk', zip: '01000', x: 1, y: 2, tag: Symbol('1'),
    }],
  ])('GeoExt bypasses %j', value => {
    expect(GeoExt(value)).toEqual(value);
  });

  it.each([
    ['string is expected in city but "undefined" received.', { x: 1, y: 1 }],
    ['number is expected in x but "undefined" received.', { city: 'Moscow', street: 'Arbat', zip: '01000' }],
    ['string is expected in street but "undefined" received.', { x: 1, y: 1, city: 'Moscow' }],
    ['number is expected in y but "undefined" received.', {
      city: 'Moscow', street: 'Arbat', zip: '01000', x: 4,
    }],
  ])('Geo throws a TypeError with message "%s" for %j', (message, value) => {
    expect(() => Geo(value)).toThrow(new TypeError(message));
  });

  it.each([
    ['string is expected in data.city but "undefined" received.', { x: 1, y: 1 }],
    ['number is expected in data.x but "undefined" received.', { city: 'Moscow', street: 'Arbat', zip: '01000' }],
    ['string is expected in data.street but "undefined" received.', { x: 1, y: 1, city: 'Moscow' }],
    ['number is expected in data.y but "undefined" received.', {
      city: 'Moscow', street: 'Arbat', zip: '01000', x: 4,
    }],
  ])('Geo throws a TypeError with message "%s" for %j (with context)', (message, value) => {
    expect(() => Geo(value, 'data')).toThrow(new TypeError(message));
  });
});
