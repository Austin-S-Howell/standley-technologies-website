import { useLocation } from 'react-router-dom'

/** Pages with a full-bleed dark design (the Apollo page). */
const DARK_ROUTES = ['/apollo']

/**
 * True on a dark page, so site chrome (the header, the mobile contact bar)
 * can switch to its light-on-dark styling there. Tolerates a trailing slash.
 */
export function useDarkRoute(): boolean {
  const { pathname } = useLocation()
  return DARK_ROUTES.includes(pathname.replace(/\/+$/, '') || '/')
}
