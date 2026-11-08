-- Course lesson data. Store unlisted YouTube links and lesson content on each video row.
alter table public.content_items
  add column if not exists video_url text,
  add column if not exists summary text,
  add column if not exists materials jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

-- Quiz scores are practice results and are visible only to the student who submitted them.
create table if not exists public.content_quiz_attempts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  item_id    uuid not null references public.content_items(id) on delete cascade,
  score      int not null check (score >= 0),
  total      int not null check (total > 0 and score <= total),
  created_at timestamptz not null default now()
);

alter table public.content_quiz_attempts enable row level security;

drop policy if exists "students read own quiz attempts" on public.content_quiz_attempts;
create policy "students read own quiz attempts" on public.content_quiz_attempts
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "students submit own quiz attempts" on public.content_quiz_attempts;
create policy "students submit own quiz attempts" on public.content_quiz_attempts
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and public.has_learning_access()
    and exists (
      select 1 from public.content_items
      where id = item_id and kind = 'video'
    )
  );

-- Example lesson setup (replace the IDs, links, and content with your own):
-- update public.content_items
-- set video_url = 'https://www.youtube.com/watch?v=VIDEO_ID',
--     summary = 'Key takeaways from this lesson...',
--     materials = '[{"title":"Lesson worksheet","url":"https://example.com/worksheet.pdf","type":"PDF"}]'::jsonb,
--     quiz = '[{"question":"What is the first step?","options":["Plan","Publish"],"answer":0,"explanation":"Start with a plan."}]'::jsonb
-- where id = 'VIDEO_CONTENT_ITEM_UUID' and kind = 'video';
