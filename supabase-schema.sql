-- RK Portfolio CMS
-- Run this once in Supabase SQL Editor.

create table if not exists public.portfolio_content (
  id bigint primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

-- Public portfolio can read the published content.
drop policy if exists "Public can read portfolio" on public.portfolio_content;
create policy "Public can read portfolio"
on public.portfolio_content
for select
to anon, authenticated
using (true);

-- Only signed-in admin users can create/update the content row.
drop policy if exists "Authenticated users can insert portfolio" on public.portfolio_content;
create policy "Authenticated users can insert portfolio"
on public.portfolio_content
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update portfolio" on public.portfolio_content;
create policy "Authenticated users can update portfolio"
on public.portfolio_content
for update
to authenticated
using (true)
with check (true);

-- Paste the generated content.json into the JSON value below after replacing
-- the placeholder. The admin page can also create the first row if you allow insert.
-- Example:
-- insert into public.portfolio_content (id, content) values (1, '{...}'::jsonb)
-- on conflict (id) do update set content = excluded.content, updated_at = now();
