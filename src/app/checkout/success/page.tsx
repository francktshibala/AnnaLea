'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to books page since checkout is disabled for Phase 3
    router.replace('/books');
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 font-display text-primary">
          Redirecting to Books...
        </h1>
        <p className="text-secondary font-body">
          We're now directing you to browse Anna Lea's collection with direct Amazon purchase links.
        </p>
      </div>
    </main>
  );
}