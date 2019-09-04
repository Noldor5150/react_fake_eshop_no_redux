// example of mocking
import timeDiff from './timeDiff';

beforeAll(() => {
  global.Date = {
    now: jest.fn(() => 1567616054522),
  };

  global.fetch = jest.fn();
});

describe('timeDiff', () => {
  it('Returns time diff between now and 2019-09-01', () => {
    const result = timeDiff(1567296000000);
    expect(result).toBe(320054522);
  });

  it('fetch example', () => {
    fetch.mockReturnValueOnce({ api_value: 'mocked' });
    expect(fetch).not.toBeCalled();

    const result = fetch();

    expect(result).toEqual({ api_value: 'mocked' });
    expect(fetch).toBeCalledTimes(1);
  });
});
