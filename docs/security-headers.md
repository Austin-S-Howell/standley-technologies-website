# Security headers (Cloudflare)

The site is static and hosted on **GitHub Pages**, which cannot set custom HTTP
response headers. The domain is proxied through **Cloudflare**, so security
headers are added there, at the edge. This file is the source of truth for what
to configure — copy the values below into the Cloudflare dashboard.

> One header is already handled in the app: `index.html` ships
> `<meta name="referrer" content="strict-origin-when-cross-origin">`. Everything
> else has to be a real HTTP header, which means Cloudflare.

## Headers to set

| Header | Value |
| --- | --- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `X-Frame-Options` | `DENY` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Content-Security-Policy` | see below |

### Content-Security-Policy

This policy is tailored to what the site actually loads: everything from its own
origin, plus the Web3Forms endpoint the contact form POSTs to.

```
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
img-src 'self' data:;
font-src 'self';
style-src 'self' 'unsafe-inline';
script-src 'self' 'unsafe-inline';
connect-src 'self' https://api.web3forms.com;
form-action 'self' https://api.web3forms.com;
upgrade-insecure-requests
```

Notes:

- `connect-src https://api.web3forms.com` is **required** — drop it and the
  contact form stops working.
- `style-src 'unsafe-inline'` is required because React / Framer Motion set
  inline `style` attributes on elements.
- `script-src 'unsafe-inline'` is included so the inline JSON-LD `<script>`
  blocks in `index.html` are allowed. The site loads **no** third-party or
  user-supplied scripts, so the practical risk is low. To tighten it, drop
  `'unsafe-inline'` from `script-src` and add a SHA-256 hash for each JSON-LD
  block instead (`script-src 'self' 'sha256-…' 'sha256-…'`); re-generate the
  hashes whenever that JSON-LD changes.

## How to apply in Cloudflare

**Option A — Rules → Transform Rules → Modify Response Header** (no code):

1. Cloudflare dashboard → your domain → **Rules** → **Transform Rules** →
   **Modify Response Header** → **Create rule**.
2. Set the filter to **All incoming requests** (or `Hostname equals
   standleytechnologies.com`).
3. Add one **Set static** action per header from the table above.
4. Deploy.

**Option B — a Cloudflare Worker / Snippet** (one place, version-controllable):

```js
export default {
  async fetch(request, env) {
    const res = await fetch(request)
    const h = new Headers(res.headers)
    h.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
    h.set('X-Content-Type-Options', 'nosniff')
    h.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    h.set('X-Frame-Options', 'DENY')
    h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()')
    h.set('Cross-Origin-Opener-Policy', 'same-origin')
    h.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "img-src 'self' data:",
        "font-src 'self'",
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-inline'",
        "connect-src 'self' https://api.web3forms.com",
        "form-action 'self' https://api.web3forms.com",
        'upgrade-insecure-requests',
      ].join('; '),
    )
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h })
  },
}
```

## Verify

After deploying, confirm the headers are live:

```sh
curl -sI https://standleytechnologies.com | grep -iE 'content-security-policy|strict-transport|x-content-type|referrer-policy|permissions-policy'
```

Or paste the URL into <https://securityheaders.com> for a graded report.
