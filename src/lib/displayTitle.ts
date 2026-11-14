/**
 * Display helpers for CMS titles.
 *
 * Some project titles were entered in ALL CAPS ("TNSCB CONSTRUCTION OF 864 ...").
 * We fix that at display time rather than in the data, so admin publishes can't
 * bring it back. Only titles that are almost entirely upper case are touched.
 */

// Kept upper case when an all-caps title is converted.
const ACRONYMS = new Set([
  'ARHC', 'BMTPC', 'CEL', 'CMDA', 'CMWSSB', 'CPCL', 'CUBE', 'DN', 'DPR', 'EWS', 'GIS', 'HFA', 'HIG',
  'IISER', 'IIT', 'IITM', 'LHP', 'LIG', 'MAWS', 'MIG', 'NABL', 'NH', 'NIT', 'PMAY', 'PMC', 'SH',
  'SIPCOT', 'TIDEL', 'TN', 'TNHB', 'TNPCB', 'TNSCB', 'TNUHDB', 'TPQA', 'TPQAS', 'UPT',
]);

// Lower case unless they start the title.
const SMALL_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);

function isMostlyUpperCase(text: string): boolean {
  const letters = text.replace(/[^A-Za-z]/g, '');
  if (letters.length < 12) return false; // short labels like "CEL" are intentional
  const upper = letters.replace(/[^A-Z]/g, '').length;
  return upper / letters.length > 0.8;
}

function convertWord(word: string, isFirst: boolean): string {
  const core = word.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
  if (!core) return word;
  // Codes and numbers stay as typed: (S+9), K.P., G+2, 1260
  if (/[0-9+.]/.test(core) || ACRONYMS.has(core.toUpperCase())) return word;
  const lower = core.toLowerCase();
  const next = !isFirst && SMALL_WORDS.has(lower) ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
  return word.replace(core, next);
}

/** Title-case a title only if it was entered in ALL CAPS; otherwise return it unchanged. */
export function displayTitle(title: string): string {
  if (!title || !isMostlyUpperCase(title)) return title;
  return title
    .split(/(\s+)/)
    .map((part, i) => (/^\s+$/.test(part) ? part : convertWord(part, i === 0)))
    .join('');
}
