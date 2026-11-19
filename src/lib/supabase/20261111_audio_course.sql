alter table public.content_items
  drop constraint if exists content_items_kind_check;

alter table public.content_items
  add constraint content_items_kind_check check (kind in ('book', 'video', 'audio')),
  add column if not exists audio_path text,
  add column if not exists image_path text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'audio-lessons',
  'audio-lessons',
  false,
  104857600,
  array['audio/mpeg', 'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/wav', 'audio/webm',
        'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "students with access read audio lessons" on storage.objects;
create policy "students with access read audio lessons" on storage.objects
  for select to authenticated
  using (bucket_id = 'audio-lessons' and public.has_learning_access());
