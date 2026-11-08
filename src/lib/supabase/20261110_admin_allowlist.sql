create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now(),
  constraint admin_allowlist_email_lowercase check (email = lower(email))
);

alter table public.admin_allowlist enable row level security;
revoke all on public.admin_allowlist from public, anon, authenticated;
grant all on public.admin_allowlist to service_role;

insert into public.admin_allowlist (email)
values ('norvara0@gmail.com')
on conflict (email) do nothing;
