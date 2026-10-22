-- Content list (books + video courses). Visible only to buyers.
create table if not exists public.content_items (
  id             uuid primary key default gen_random_uuid(),
  kind           text not null check (kind in ('book','video')),
  title          text not null,
  position       int  not null default 0,
  file_path      text,   -- books: file name inside the private 'books' bucket
  bunny_video_id text    -- videos: the video's ID in Bunny Stream
);
alter table public.content_items enable row level security;
create policy "buyers see content" on public.content_items
  for select to authenticated using (public.has_access('complete-system'));

-- Per-student progress (the reader / player pages update this).
create table if not exists public.content_progress (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  item_id    uuid not null references public.content_items(id) on delete cascade,
  percent    int  not null default 0 check (percent between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
alter table public.content_progress enable row level security;
create policy "own progress" on public.content_progress
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Private bucket for the PDFs, readable only by buyers.
insert into storage.buckets (id, name, public) values ('books', 'books', false) on conflict (id) do nothing;
create policy "buyers read books" on storage.objects
  for select to authenticated using (bucket_id = 'books' and public.has_access('complete-system'));

-- Example rows (replace file names / Bunny IDs with yours):
-- insert into public.content_items (kind, title, position, file_path) values
--  ('book','Stop Waiting. Start Building.',1,'stop-waiting-start-building.pdf'),
--  ('book','Find Your Idea',2,'find-your-idea.pdf'),
--  ('book','Create Your Digital Product',3,'create-your-digital-product.pdf'),
--  ('book','Teach Your Idea',4,'teach-your-idea.pdf');
-- insert into public.content_items (kind, title, position, bunny_video_id) values
--  ('video','Facebook',1,'PASTE-BUNNY-VIDEO-ID');