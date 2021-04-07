import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const Signin = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/app');
    }
  });

  return (
    <button type="github" onClick={() => signIn('github')}>
      Sign up with GitHub{' '}
    </button>
  );
};

export default Signin;
