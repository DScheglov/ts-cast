import { isoDate, unixDateTimeStamp, jsDateTimeStamp } from '../..';

describe('isoDate', () => {
  it('isoDate.name === "ISODate"', () => {
    expect(isoDate.name).toBe('ISODate');
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('isoDate.%s is a Function', methodName => {
      expect((isoDate as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  it.each([
    ['2020-10-12', Date.UTC(2020, 9, 12)],
    ['2020-10', Date.UTC(2020, 9)],
    ['2020', Date.UTC(2020, 0)],
    ['2020-10-12T10:00', new Date(2020, 9, 12, 10)],
    ['2020-10-12T10:00Z', Date.UTC(2020, 9, 12, 10)],
    ['2020-02-02T01:00:20Z', Date.UTC(2020, 1, 2, 1, 0, 20)],
    ['2020-02-02T01:00:20', new Date(2020, 1, 2, 1, 0, 20)],
    ['2020-10-12 10:00', new Date(2020, 9, 12, 10)],
    ['2020-10-12 10:00Z', Date.UTC(2020, 9, 12, 10)],
    ['2020-02-02 01:00:20Z', Date.UTC(2020, 1, 2, 1, 0, 20)],
    ['2020-02-02 01:00:20', new Date(2020, 1, 2, 1, 0, 20)],
  ])('returns date for %s', (dateStr, date) => {
    expect(isoDate(dateStr)).toEqual(new Date(date));
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['20'],
    ['22-02'],
    ['2432-4234-234'],
    ['127.0.0.1'],
    [1],
    [NaN],
    [{}],
    [[]],
    ['1979-15-01T24:78:23'],
  ])('throws error for %s', value => {
    expect(() => isoDate(value)).toThrow(
      new TypeError(`ISODate is expected but "${value}" received.`),
    );
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['20'],
    ['22-02'],
    ['2432-4234-234'],
    ['127.0.0.1'],
    [1],
    [NaN],
    [{}],
    [[]],
    ['1979-15-01T24:78:23'],
  ])('throws error for %s (with context)', value => {
    expect(() => isoDate(value, 'createdAt')).toThrow(
      new TypeError(`ISODate is expected in createdAt but "${value}" received.`),
    );
  });
});

describe('unixDateTimeStamp', () => {
  it('unixDateTimeStamp.name === "unixDateTimeStamp"', () => {
    expect(unixDateTimeStamp.name).toBe('UnixDateTimeStamp');
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('unixDateTimeStamp.%s is a Function', methodName => {
      expect((unixDateTimeStamp as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  it.each([
    ['2020-10-12', Date.UTC(2020, 9, 12)],
    ['2020-10', Date.UTC(2020, 9)],
    ['2020', Date.UTC(2020, 0)],
    ['2020-10-12T10:00', new Date(2020, 9, 12, 10)],
    ['2020-10-12T10:00Z', Date.UTC(2020, 9, 12, 10)],
    ['2020-02-02T01:00:20Z', Date.UTC(2020, 1, 2, 1, 0, 20)],
    ['2020-02-02T01:00:20', new Date(2020, 1, 2, 1, 0, 20)],
    ['2020-10-12 10:00', new Date(2020, 9, 12, 10)],
    ['2020-10-12 10:00Z', Date.UTC(2020, 9, 12, 10)],
    ['2020-02-02 01:00:20Z', Date.UTC(2020, 1, 2, 1, 0, 20)],
    ['2020-02-02 01:00:20', new Date(2020, 1, 2, 1, 0, 20)],
    [1, 1],
    [0, 0],
  ])('returns date for %s', (dateStr, date) => {
    expect(unixDateTimeStamp(new Date(dateStr).getTime() / 1000)).toEqual(new Date(date));
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['20'],
    ['22-02'],
    ['2432-4234-234'],
    ['127.0.0.1'],

    [NaN],
    [{}],
    [[]],
    ['1979-15-01T24:78:23'],
  ])('throws error for %s', value => {
    expect(() => unixDateTimeStamp(value)).toThrow(
      new TypeError(`UnixDateTimeStamp is expected but "${value}" received.`),
    );
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['20'],
    ['22-02'],
    ['2432-4234-234'],
    ['127.0.0.1'],
    [NaN],
    [{}],
    [[]],
    ['1979-15-01T24:78:23'],
  ])('throws error for %s (with context)', value => {
    expect(() => unixDateTimeStamp(value, 'createdAt')).toThrow(
      new TypeError(`UnixDateTimeStamp is expected in createdAt but "${value}" received.`),
    );
  });
});

describe('jsDateTimeStamp', () => {
  it('jsDateTimeStamp.name === "JSDateTimeStamp"', () => {
    expect(jsDateTimeStamp.name).toBe('JSDateTimeStamp');
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('jsDateTimeStamp.%s is a Function', methodName => {
      expect((jsDateTimeStamp as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  it.each([
    ['2020-10-12', Date.UTC(2020, 9, 12)],
    ['2020-10', Date.UTC(2020, 9)],
    ['2020', Date.UTC(2020, 0)],
    ['2020-10-12T10:00', new Date(2020, 9, 12, 10)],
    ['2020-10-12T10:00Z', Date.UTC(2020, 9, 12, 10)],
    ['2020-02-02T01:00:20Z', Date.UTC(2020, 1, 2, 1, 0, 20)],
    ['2020-02-02T01:00:20', new Date(2020, 1, 2, 1, 0, 20)],
    ['2020-10-12 10:00', new Date(2020, 9, 12, 10)],
    ['2020-10-12 10:00Z', Date.UTC(2020, 9, 12, 10)],
    ['2020-02-02 01:00:20Z', Date.UTC(2020, 1, 2, 1, 0, 20)],
    ['2020-02-02 01:00:20', new Date(2020, 1, 2, 1, 0, 20)],
    [1, 1],
    [0, 0],
  ])('returns date for %s', (dateStr, date) => {
    expect(jsDateTimeStamp(new Date(dateStr).getTime())).toEqual(new Date(date));
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['20'],
    ['22-02'],
    ['2432-4234-234'],
    ['127.0.0.1'],

    [NaN],
    [{}],
    [[]],
    ['1979-15-01T24:78:23'],
  ])('throws error for %s', value => {
    expect(() => jsDateTimeStamp(value)).toThrow(
      new TypeError(`JSDateTimeStamp is expected but "${value}" received.`),
    );
  });

  it.each([
    [null],
    [undefined],
    [''],
    ['20'],
    ['22-02'],
    ['2432-4234-234'],
    ['127.0.0.1'],
    [NaN],
    [{}],
    [[]],
    ['1979-15-01T24:78:23'],
  ])('throws error for %s (with context)', value => {
    expect(() => jsDateTimeStamp(value, 'createdAt')).toThrow(
      new TypeError(`JSDateTimeStamp is expected in createdAt but "${value}" received.`),
    );
  });
});
