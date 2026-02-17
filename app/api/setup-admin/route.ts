import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = 'muhivan752@gmail.com';
const ADMIN_PASSWORD = 'admin123!';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureStorageBucket(supabase: any) {
  // Check if bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b: { id: string }) => b.id === 'fleet-images');

  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket('fleet-images', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
    });
    if (error && !error.message.includes('already exists')) {
      return { created: false, error: error.message };
    }
  }

  return { created: !bucketExists, error: null };
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_SUPABASE_URL not configured' },
      { status: 500 },
    );
  }

  // Method 1: Use service role key (recommended - auto-confirms email)
  if (supabaseServiceKey) {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Ensure storage bucket exists
    const storageResult = await ensureStorageBucket(supabase);

    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });

    if (error) {
      // If user already exists, try to update the password
      if (error.message.includes('already') || error.message.includes('exists')) {
        // List users to find the admin
        const { data: users } = await supabase.auth.admin.listUsers();
        const adminUser = users?.users?.find((u) => u.email === ADMIN_EMAIL);

        if (adminUser) {
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            adminUser.id,
            { password: ADMIN_PASSWORD, email_confirm: true },
          );

          if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 400 });
          }

          return NextResponse.json({
            message: 'Admin password reset & email confirmed!',
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            storage: storageResult.created ? 'fleet-images bucket created!' : 'fleet-images bucket already exists',
            note: 'You can now login at /admin/login. Delete this API route after setup.',
          });
        }
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Admin account created successfully (email auto-confirmed)!',
      email: data.user?.email,
      password: ADMIN_PASSWORD,
      storage: storageResult.created ? 'fleet-images bucket created!' : 'fleet-images bucket already exists',
      note: 'You can now login at /admin/login. Delete this API route after setup.',
    });
  }

  // Method 2: Fallback to anon key signUp (requires email confirmation disabled in Supabase)
  if (!supabaseAnonKey) {
    return NextResponse.json(
      { error: 'No Supabase key configured. Add SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local' },
      { status: 500 },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.auth.signUp({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Check if email confirmation is needed
  const needsConfirmation = data.user && !data.user.confirmed_at;

  return NextResponse.json({
    message: needsConfirmation
      ? 'Admin account created, but EMAIL CONFIRMATION REQUIRED!'
      : 'Admin account created successfully!',
    email: data.user?.email,
    password: ADMIN_PASSWORD,
    needsConfirmation,
    hint: needsConfirmation
      ? 'Option 1: Check email inbox for confirmation link. Option 2: Add SUPABASE_SERVICE_ROLE_KEY to .env.local and call this endpoint again to auto-confirm. Option 3: Disable "Confirm email" in Supabase Dashboard > Authentication > Providers > Email.'
      : 'You can now login at /admin/login. Delete this API route after setup.',
  });
}
