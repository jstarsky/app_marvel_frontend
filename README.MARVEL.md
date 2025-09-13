Setup for Marvel API (secure)

Goal
- Keep the private Marvel API key on the server and have the client call local API routes.

Files in this project
- src/lib/server/marvel.ts  -> server axios instance that computes md5(ts + PRIVATE + PUBLIC) and signs requests
- src/app/api/marvel/characters/route.ts -> server API route that proxies /characters queries to Marvel
- src/lib/api/marvel.ts -> client axios wrapper that calls local API routes (no private key)

Environment variables (add to .env.local)
- MARVEL_API_PRIVATE_KEY=your_private_key_here   # server-only
- NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY=your_public_key_here
- NEXT_PUBLIC_MARVEL_API_URL=https://gateway.marvel.com/v1/public

How to run
1. Add the env vars to .env.local (do NOT commit .env.local).
2. Restart the Next dev server so next.config and server envs are reloaded:
   rm -rf .next && npm run dev

If you want a client-only, unsafe test (NOT RECOMMENDED)
- You can add NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY and compute MD5 in the browser, but this exposes your private key to anyone and should be used only for local ad-hoc testing.

Recommended workflow
- Keep private key server-side. Use API routes to proxy/signed requests. Use client axios to call the API routes.

Files to check if something is wrong
- next.config.ts -> ensure i.annihil.us is in images.domains or remotePatterns
- src/components/card/index.tsx -> normalizes Marvel image protocol to https

Contact
- If you want, I can revert the project to a client-side MD5 for local testing, but I recommend keeping the server-side signer. Reply "client-test" to request the unsafe setup and I'll implement it (and fix the TypeScript md5 conversion error). Otherwise reply "restore secure" and I'll make a final pass to remove any leftover console logs and ensure everything is clean.
