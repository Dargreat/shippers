CREATE OR REPLACE FUNCTION public.auto_assign_first_admin()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
begin
  insert into public.user_roles (user_id, role) values (new.id, 'admin');
  return new;
end;
$$;