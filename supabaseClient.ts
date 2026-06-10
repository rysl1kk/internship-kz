import { createClient } from '@supabase/supabase-js'

// Эти данные мы сейчас возьмем из твоего личного кабинета Supabase
const supabaseUrl = 'https://bnbpixsclzhkmtnutvyh.supabase.co/rest/v1/'
const supabaseKey = 'sb_publishable_NBscXmzyE6veEc8kNX5NoA_Fgin6QXv'

export const supabase = createClient(supabaseUrl, supabaseKey)