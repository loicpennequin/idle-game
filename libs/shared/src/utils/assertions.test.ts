import { describe, expect, test } from 'vitest';
import {
  isDefined,
  isNil,
  isObject,
  isString,
  isNumber,
  isBoolean
} from './assertions';

describe('assertions', () => {
  test('isString', () => {
    expect(isString('hello')).toBe(true);
    expect(isString(12345)).toBe(false);
  });

  test('isNumber', () => {
    expect(isNumber(12345)).toBe(true);
    expect(isNumber('not a number')).toBe(false);
  });

  test('isObject', () => {
    expect(isObject({ isAnObject: true })).toBe(true);
    expect(isObject({})).toBe(true);
    expect(isObject('not an object')).toBe(false);
    expect(isObject(null)).toBe(false);
  });

  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean('not a boolean')).toBe(false);
  });

  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean('not a boolean')).toBe(false);
  });

  test('isDefined', () => {
    expect(isDefined(true)).toBe(true);
    expect(isDefined({ some: 'object' })).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  test('isNil', () => {
    expect(isNil(true)).toBe(false);
    expect(isNil({ some: 'object' })).toBe(false);
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });
});
