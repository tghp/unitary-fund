import { atom, map } from 'nanostores';

/**
 * UI
 */

export const navigationOpenAtom = atom(false);
export const navigationActiveSubmenuAtom = atom<string | null>(null);

/**
 * Grants
 */

export const grantsFilterMap = map<Record<string, string>>({});
