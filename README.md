# Nuxt Multi Tenant Example

[Demo](https://psytest.pt)

## Getting Started

1. Environment variables

Add environment variables in `.env.local` or `.env`

2. Install Dependencies

```bash
bun install
```

3. Run

```bash
bun dev
```

## Tech Stack

We use [Nuxt-Multi-Tenancy](https://github.com/hieuhani/nuxt-multi-tenancy) module.

## Deploy

To deploy on Vercel:

1. Add Upstash Redis in Storage Settings

2. Add `BASE_URL` in Vercel environment varibles

3. Add custom domain in Vercel (including wildcard one)

```
<your-domain-name>.com
*.<your-domain-name>.com
```

4. Change `multiTenancy.rootDomains` option in `nuxt.config.ts` to include your custom domain.
