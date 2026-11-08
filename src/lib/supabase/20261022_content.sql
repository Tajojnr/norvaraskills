create table if not exists public.admin_access_grants (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  granted_by uuid not null references auth.users(id),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);

alter table public.admin_access_grants enable row level security;
revoke all on public.admin_access_grants from anon, authenticated;
grant all on public.admin_access_grants to service_role;

create or replace function public.has_learning_access()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.admin_access_grants
    where user_id = auth.uid()
      and revoked_at is null
  );
$$;

revoke all on function public.has_learning_access() from public, anon;
grant execute on function public.has_learning_access() to authenticated;

-- Content list (books + video courses). Visible only to approved users.
create table if not exists public.content_items (
  id             uuid primary key default gen_random_uuid(),
  kind           text not null check (kind in ('book','video')),
  title          text not null,
  position       int  not null default 0,
  file_path      text,   -- books: file name inside the private 'books' bucket
  bunny_video_id text    -- videos: the video's ID in Bunny Stream
);
alter table public.content_items enable row level security;
drop policy if exists "buyers see content" on public.content_items;
drop policy if exists "students with access see content" on public.content_items;
create policy "students with access see content" on public.content_items
  for select to authenticated using (public.has_learning_access());

-- Per-student progress (the reader / player pages update this).
create table if not exists public.content_progress (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  item_id    uuid not null references public.content_items(id) on delete cascade,
  percent    int  not null default 0 check (percent between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
alter table public.content_progress enable row level security;
drop policy if exists "own progress" on public.content_progress;
drop policy if exists "students manage own progress" on public.content_progress;
create policy "own progress" on public.content_progress
  for all to authenticated
  using (user_id = auth.uid() and public.has_learning_access())
  with check (user_id = auth.uid() and public.has_learning_access());

-- Private bucket for PDFs. Only approved users can read book files.
insert into storage.buckets (id, name, public) values ('books', 'books', false) on conflict (id) do nothing;
drop policy if exists "buyers read books" on storage.objects;
drop policy if exists "students with access read books" on storage.objects;
create policy "students with access read books" on storage.objects
  for select to authenticated
  using (bucket_id = 'books' and public.has_learning_access());

-- Example rows (replace file names / Bunny IDs with yours):
-- insert into public.content_items (kind, title, position, file_path) values
--  ('book','Stop Waiting. Start Building.',1,'stop-waiting-start-building.pdf'),
--  ('book','Find Your Idea',2,'find-your-idea.pdf'),
--  ('book','Create Your Digital Product',3,'create-your-digital-product.pdf'),
--  ('book','Teach Your Idea',4,'teach-your-idea.pdf');
-- insert into public.content_items (kind, title, position, bunny_video_id) values
--  ('video','Facebook',1,'PASTE-BUNNY-VIDEO-ID');