import { formatDate, formatRelativeTime } from '../dates';

const at = (year: number, month: number, day: number, hour = 12, minute = 0) =>
  new Date(year, month - 1, day, hour, minute);

describe('formatRelativeTime', () => {
  const now = at(2026, 3, 12, 12, 0);

  it('says "Just now" under a minute and counts minutes after that', () => {
    expect(formatRelativeTime(new Date(now.getTime() - 20_000).toISOString(), now)).toBe('Just now');
    expect(formatRelativeTime(at(2026, 3, 12, 11, 59).toISOString(), now)).toBe('1 min ago');
  });

  it('counts minutes and hours within the same day', () => {
    expect(formatRelativeTime(at(2026, 3, 12, 11, 15).toISOString(), now)).toBe('45 min ago');
    expect(formatRelativeTime(at(2026, 3, 12, 9, 0).toISOString(), now)).toBe('3 h ago');
  });

  it('uses calendar days for "Yesterday" even when under 24 hours ago', () => {
    const lateNow = at(2026, 3, 12, 0, 10);
    expect(formatRelativeTime(at(2026, 3, 11, 23, 50).toISOString(), lateNow)).toBe('20 min ago');
    expect(formatRelativeTime(at(2026, 3, 11, 20, 0).toISOString(), lateNow)).toBe('Yesterday');
  });

  it('counts days up to a week, then shows the date', () => {
    expect(formatRelativeTime(at(2026, 3, 9, 8, 0).toISOString(), now)).toBe('3 days ago');
    expect(formatRelativeTime(at(2026, 3, 1, 8, 0).toISOString(), now)).toBe('1 Mar 2026');
  });
});

describe('formatDate', () => {
  it('formats day, short month and year', () => {
    expect(formatDate(at(2026, 12, 5).toISOString())).toBe('5 Dec 2026');
  });
});
