CREATE TABLE public.waitlist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  country TEXT,
  volume TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert waitlist submissions" ON public.waitlist_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all waitlist submissions" ON public.waitlist_submissions
  FOR SELECT USING (is_admin());