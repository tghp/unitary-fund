import { atom, map } from 'nanostores';

/**
 * UI
 */

export const navigationOpenAtom = atom(false);
export const navigationActiveSubmenuAtom = atom<string | null>(null);

/**
 * Filtering
 */

export const filterMap = map<Record<string, string>>({});

export type FilterMode = 'tags' | 'filter';
export const filterModeAtom = atom<FilterMode | null>(null);
