-- Create a trigger: when first user signs up and no admins exist, auto-assign admin role
create or replace function public.auto_assign_first_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- If no admin exists yet, make this user an admin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_assign_admin
  after insert on auth.users
  for each row
  execute function public.auto_assign_first_admin();