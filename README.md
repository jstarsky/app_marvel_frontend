# Marvel Frontend (app_marvel_frontend)

Frontend for the Marvel demo — a Next.js (app router) TypeScript + Tailwind CSS application that queries a backend API and, via the backend, the Marvel public API.

## At a glance
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Backend: Separate Django REST API (recommended to run locally or as a deployed service)

This README focuses on how to run the frontend, which environment variables are required, and security guidance about which variables must remain server-only.

## Environment variables and security
IMPORTANT: Any env var that begins with `NEXT_PUBLIC_` will be embedded into the client bundle and is visible to end users. Do NOT put secrets or private keys in variables prefixed with `NEXT_PUBLIC_`.

Variables used by this project (examples):

- `NEXT_PUBLIC_API_URL` (required) — the base URL for the backend API the frontend talks to.
  - Local dev example: `http://127.0.0.1:8000`
  - Production example: `https://appmarvelbackend-production.up.railway.app`
- `NEXT_PUBLIC_MARVEL_API_URL` (optional) — Marvel public API base URL (default: `https://gateway.marvel.com/v1/public`).
- `NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY` (optional) — Marvel public key. This can be client-visible.

DO NOT set the Marvel private key in any `NEXT_PUBLIC_*` variable. Instead, keep it on the backend and use the backend to compute the MD5 signature required by the Marvel API.

Example `.env.development` (minimum):

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_MARVEL_API_URL=https://gateway.marvel.com/v1/public
NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY=<your-public-key>
# DO NOT add your private key here
```

If you previously had `NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY` in `.env.*`, remove it and store the private key only in the backend environment (Railway secrets or your hosting provider's secret store).

## How Marvel signing should work (server-side)
1. Client requests data from your backend (no private key anywhere in the browser).
2. Backend computes the Marvel auth params:
   - ts = timestamp
   - hash = md5(ts + private_key + public_key)
3. Backend calls the Marvel API with `ts`, `apikey` (public key), and `hash` and returns data to the client.

This keeps your private key secret and prevents accidental leakage.

## Local development

1. Install dependencies

```bash
npm install
# or
pnpm install
```

2. Create a `.env.development` with at least `NEXT_PUBLIC_API_URL` and the public Marvel key if you use it in the client.

3. Run the dev server

```bash
npm run dev
```

4. Visit http://localhost:3000

## Deployment notes (Railway or similar)

- Add `NEXT_PUBLIC_API_URL` pointing to your backend URL.
- Add `NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY` client-side only.
- Add the Marvel private key to the backend environment only (do NOT expose it to the client).

Backend (Django) CORS checklist for a deployed frontend

- Ensure `django-cors-headers` is installed and `CorsMiddleware` appears early in `MIDDLEWARE` (before middleware that can short-circuit responses).
- Set `CORS_ALLOWED_ORIGINS` to the exact origin(s) of your frontend (e.g. `https://your-frontend.up.railway.app`).
- If the client sends cookies or uses credentialed requests, set `CORS_ALLOW_CREDENTIALS = True` and ensure the backend returns `Access-Control-Allow-Credentials: true` and a specific `Access-Control-Allow-Origin` header (wildcard `*` is invalid for credentialed requests).
- Add the frontend origin(s) to `CSRF_TRUSTED_ORIGINS` if cookie-based auth / CSRF tokens are used.

If you see CORS errors only in the browser but requests succeed in Postman, it's almost always a CORS preflight (OPTIONS) or credential mismatches on the server.

## Fixing a common Django/DRF error
If you encounter "You must call .is_valid() before accessing .errors.", ensure your view/serializer calls `serializer.is_valid()` before trying to read `serializer.errors`. Prefer `serializer.is_valid(raise_exception=True)` so DRF returns an appropriate error response automatically.

## Troubleshooting tips

- To inspect CORS response headers quickly, run a curl OPTIONS request against a backend endpoint to ensure Access-Control headers are present and correct.
- Confirm that the backend `CORS_ALLOWED_ORIGINS` includes the exact frontend origin (including scheme and port).

## Contributing & linting

- Run `npm run lint` before pushing changes.
- Keep UI sizes consistent: many components use a fixed comic card width (`11.2rem`) to maintain a predictable carousel layout.

## Need help?
If you want I can:

- Patch backend `settings.py` to ensure `CorsMiddleware` ordering, add `CSRF_TRUSTED_ORIGINS`, and suggest minimal cookie settings for production.
- Remove any accidental `NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY` values from client `.env` files and move the key to the backend env.

Reply with `apply README` to commit this README, or `apply README + fix backend` to also prepare a `settings.py` patch for your Django backend (I'll show the diff before applying).
