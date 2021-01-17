import { record, int, str } from '..';

describe('record', () => {
  const toCamelCase = (key: string) => key
    .split('_')
    .map(
      (part, index) => (index > 0 ? `${part[0].toUpperCase()}${part.slice(1)}` : part),
    ).join('');

  describe('Caster interface', () => {
    it('record(str, int).name === "Record<string, integer>"', () => {
      expect(record(str, int).name).toBe('Record<string, integer>');
    });

    it('record(str, int, "StrIntMap").name === "StrIntMap"', () => {
      expect(record(str, int, 'StrIntMap').name).toBe('StrIntMap');
    });

    it('record(str, int).optional is a Function', () => {
      expect(record(str, int).optional).toBeInstanceOf(Function);
    });

    it('record(str, int).nullable is a Function', () => {
      expect(record(str, int).nullable).toBeInstanceOf(Function);
    });

    it('record(str, int).validate is a Function', () => {
      expect(record(str, int).validate).toBeInstanceOf(Function);
    });

    it('record(str, int).map is a Function', () => {
      expect(record(str, int).map).toBeInstanceOf(Function);
    });

    it('record(str, int).default is a Function', () => {
      expect(record(str, int).default).toBeInstanceOf(Function);
    });
  });

  describe('record(str.map(toCamelCase), int)', () => {
    const jsRecord = record(str.map(toCamelCase), int);

    it.each([
      [{ contact_id: 1, room_id: 2 }, { contactId: 1, roomId: 2 }],
      [{ contractId: 100 }, { contractId: 100 }],
    ])('for %s return %s', (value, expected) => {
      expect(jsRecord(value)).toEqual(expected);
    });
  });
});
