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

drop policy if exists "buyers see content" on public.content_items;
drop policy if exists "students with access see content" on public.content_items;
create policy "students with access see content" on public.content_items
  for select to authenticated using (public.has_learning_access());

drop policy if exists "own progress" on public.content_progress;
drop policy if exists "students manage own progress" on public.content_progress;
create policy "students manage own progress" on public.content_progress
  for all to authenticated
  using (user_id = auth.uid() and public.has_learning_access())
  with check (user_id = auth.uid() and public.has_learning_access());

drop policy if exists "buyers read books" on storage.objects;
drop policy if exists "students with access read books" on storage.objects;
create policy "students with access read books" on storage.objects
  for select to authenticated
  using (bucket_id = 'books' and public.has_learning_access());

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
