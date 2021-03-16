import {
  record, integer, string, number, values,
} from '../..';

describe('record', () => {
  const toCamelCase = (key: string) => key
    .split('_')
    .map(
      (part, index) => (index > 0 ? `${part[0].toUpperCase()}${part.slice(1)}` : part),
    ).join('');

  describe('Caster interface', () => {
    it('record(str, int).name === "Record<string, integer>"', () => {
      expect(record(string, integer).name).toBe('Record<string, integer>');
    });

    it('record(str, int, "StrIntMap").name === "StrIntMap"', () => {
      expect(record(string, integer, 'StrIntMap').name).toBe('StrIntMap');
    });

    it('record(str, int).optional is a Function', () => {
      expect(record(string, integer).optional).toBeInstanceOf(Function);
    });

    it('record(str, int).nullable is a Function', () => {
      expect(record(string, integer).nullable).toBeInstanceOf(Function);
    });

    it('record(str, int).restrict is a Function', () => {
      expect(record(string, integer).restrict).toBeInstanceOf(Function);
    });

    it('record(str, int).map is a Function', () => {
      expect(record(string, integer).map).toBeInstanceOf(Function);
    });

    it('record(str, int).default is a Function', () => {
      expect(record(string, integer).default).toBeInstanceOf(Function);
    });
  });

  describe('record(str.map(toCamelCase), int)', () => {
    const jsRecord = record(string.map(toCamelCase), integer);

    it.each([
      [{ contact_id: 1, room_id: 2 }, { contactId: 1, roomId: 2 }],
      [{ contractId: 100 }, { contractId: 100 }],
    ])('for %s return %s', (value, expected) => {
      expect(jsRecord(value)).toEqual(expected);
    });
  });

  describe('record(str, int)', () => {
    const StrIntMap = record(string, integer);

    it('record(str, int).name = "Record<string, integer>"', () => {
      expect(StrIntMap.name).toBe('Record<string, integer>');
    });

    it.each([
      [{ x: 1, y: 1 }],
      [{ field: 0, tag: Number.MAX_SAFE_INTEGER }],
      [{ }],
    ])('bypasses %j', value => {
      expect(StrIntMap(value)).toEqual(value);
    });

    it.each([
      ['integer is expected in x but "1.1" received.', { x: 1.1, y: 1 }],
      ['integer is expected in tag but "-Infinity" received.', { field: 0, tag: Number.NEGATIVE_INFINITY }],
      ['integer is expected in title but "A Title" received.', { title: 'A Title' }],
    ])('throws a TypeError with message "%s" for %j', (msg, value) => {
      expect(() => StrIntMap(value)).toThrow(new TypeError(msg));
    });

    it.each([
      ['integer is expected in data.x but "1.1" received.', { x: 1.1, y: 1 }],
      ['integer is expected in data.tag but "-Infinity" received.', { field: 0, tag: Number.NEGATIVE_INFINITY }],
      ['integer is expected in data.title but "A Title" received.', { title: 'A Title' }],
    ])('throws a TypeError with message "%s" for %j (with context)', (msg, value) => {
      expect(() => StrIntMap(value, 'data')).toThrow(new TypeError(msg));
    });
  });

  describe('record(values("x", "y"), num)', () => {
    const VectorPartial = record(values('x', 'y'), number);

    it('record(values("x", "y"), num).name = Record<"x" | "y", number>', () => {
      expect(VectorPartial.name).toBe('Record<"x"|"y", number>');
    });

    it.each([
      [{ x: 1 }],
      [{ x: Number.POSITIVE_INFINITY }],
      [{ x: Math.PI }],
      [{ x: 0 }],
      [{ x: -Math.PI }],

      [{ y: 1 }],
      [{ y: Number.POSITIVE_INFINITY }],
      [{ y: Math.PI }],
      [{ y: 0 }],
      [{ y: -Math.PI }],

      [{ y: 10, x: 1 }],
      [{ y: -0, x: Number.POSITIVE_INFINITY }],
      [{ y: 0, x: Math.PI }],
      [{ y: Math.PI, x: 0 }],
      [{ y: Number.NEGATIVE_INFINITY, x: -Math.PI }],
    ])('bypasses %j', value => {
      expect(VectorPartial(value)).toEqual(value);
    });

    it.each([
      ['"x"|"y" is expected in key but "tag" received.', { tag: 1, x: 1 }],
      ['Record<"x"|"y", number> is expected but "1,2" received.', [1, 2]],
      ['"x"|"y" is expected in key but "tag" received.', { tag: -Math.PI, y: 10, x: 1 }],
    ])('throws a TypeError with message %s for %j', (message, value) => {
      expect(() => VectorPartial(value)).toThrow(new TypeError(message));
    });

    it.each([
      ['"x"|"y" is expected in key of data but "tag" received.', { tag: 1, x: 1 }],
      ['Record<"x"|"y", number> is expected in data but "1,2" received.', [1, 2]],
      ['"x"|"y" is expected in key of data but "tag" received.', { tag: -Math.PI, y: 10, x: 1 }],
    ])('throws a TypeError with message %s for %j', (message, value) => {
      expect(() => VectorPartial(value, 'data')).toThrow(new TypeError(message));
    });
  });
});
