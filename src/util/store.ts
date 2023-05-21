import { atom, map } from 'nanostores';

/**
 * UI
 */

export const navigationOpenAtom = atom(false);

/**
 * Grants
 */

export const grantsFilterMap = map<Record<string, string>>({});
