/**
 * True when the visitor's browser asks sites to use less data (the Save-Data
 * hint, e.g. a data-saver mode). The Apollo page's videos skip autoplay then.
 */
export function prefersSaveData(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
  )
}
