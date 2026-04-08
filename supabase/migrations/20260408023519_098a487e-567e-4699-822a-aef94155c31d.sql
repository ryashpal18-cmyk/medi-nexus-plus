
ALTER TABLE public.billing ADD COLUMN IF NOT EXISTS amount_paid numeric NOT NULL DEFAULT 0;
ALTER TABLE public.billing ADD COLUMN IF NOT EXISTS payment_mode text DEFAULT NULL;
