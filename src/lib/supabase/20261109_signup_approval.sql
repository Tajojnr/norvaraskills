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

create or replace function public.get_learning_access_status()
returns text
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select case
    when public.has_learning_access() then 'approved'
    when exists (
      select 1
      from public.admin_access_grants
      where user_id = auth.uid()
        and revoked_at is not null
    ) then 'declined'
    else 'pending'
  end;
$$;

revoke all on function public.get_learning_access_status() from public, anon;
grant execute on function public.get_learning_access_status() to authenticated;
