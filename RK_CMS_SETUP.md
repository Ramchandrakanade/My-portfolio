# Ramchandra Kanade Portfolio CMS — Setup

## What this gives you
- `index_fixed_v2.html` — portfolio with CMS loading support.
- `admin.html` — dark admin dashboard matching the portfolio style.
- `cms-config.js` — one place for Supabase URL/key.
- `content.json` — current portfolio content backup.
- `supabase-schema.sql` — database + Row Level Security policies.
- `seed-content.sql` — current portfolio content ready to seed into the database.

## Setup
1. Create a Supabase project.
2. In Supabase Authentication, create your admin user with an email + password. Do not put the password in source code.
3. Open SQL Editor and run `supabase-schema.sql`.
4. Run `seed-content.sql`.
5. In Supabase Project Settings > API, copy the Project URL and anon/public key.
6. Put those two values in `cms-config.js`.
7. Upload these files to the same public hosting location:
   - `index_fixed_v2.html` renamed to `index.html`
   - `admin.html`
   - `cms-config.js`
   - your existing `assets/` folder
8. Open `/admin.html`, sign in, edit content and click **Publish changes**.

## Security
The Supabase anon key is not a password and can be visible in browser source. Security comes from Row Level Security: anonymous users can only read the portfolio row; authenticated users can update it. Keep the admin account password private and enable email/password authentication only as needed.

## Instant updates
The public portfolio fetches the current content row from Supabase when the page loads. After publishing, refreshing/reopening the portfolio shows the new content. If you want updates without a page refresh while the site is already open, add realtime subscriptions later.
