import { defineProperty, defineProperties } from '../define';

describe('defineProperty', () => {
  it('defines writable property with value and writable defined and extend source type', () => {
    const x = defineProperty({}, 'name', { value: 'string', writable: true });
    expect(x.name).toEqual('string');

    x.name = 'other-string';
    expect(x.name).toBe('other-string');
  });

  it('defines writable property with get and set defined and extend source type', () => {
    let v = 'string';
    const x = defineProperty({}, 'name', { get() { return v; }, set(val: string) { v = val; } });
    expect(x.name).toEqual('string');

    x.name = 'other-string';
    expect(x.name).toBe('other-string');
  });

  it('defines readonly property with only defined and extend source type', () => {
    const x = defineProperty({}, 'name', { value: 'string' });
    expect(x.name).toEqual('string');

    expect(() => {
      // @ts-ignore
      x.name = 'other-string';
    }).toThrow(TypeError);
  });
});

describe('defineProperties', () => {
  it('defines several readonly fields', () => {
    const x = defineProperties({}, {
      name: { value: 'name' },
      size: { value: 10 },
    });

    expect(x.name).toBe('name');
    expect(x.size).toBe(10);

    expect(() => {
      // @ts-ignore
      x.name = 'other-name';
    }).toThrow(TypeError);
  });

  it('defines several writable fields', () => {
    const x = defineProperties({}, {
      name: { value: 'name', writable: true },
      size: { value: 10, writable: true },
    });

    expect(x.name).toBe('name');
    expect(x.size).toBe(10);

    x.name = 'other-name';
    x.size = 12;

    expect(x.name).toBe('other-name');
    expect(x.size).toBe(12);
  });

  it('defines writable fields with accessors', () => {
    let name: string = 'name';
    let size: number = 10;

    const x = defineProperties({}, {
      name: { get: () => name, set: (v: string) => { name = v; } },
      size: { get: () => size, set: (v: number) => { size = v; } },
    });

    expect(x.name).toBe('name');
    expect(x.size).toBe(10);

    x.name = 'other-name';
    x.size = 12;

    expect(x.name).toBe('other-name');
    expect(x.size).toBe(12);
  });
});
