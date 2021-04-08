import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Signin = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/app');
    }
  });

  return (
    <div className="container h-100">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: '100vh' }}>
        <div className="row h-100 align-content-center justify-content-center">
          <div className="col-md-4">
            <div className="row text-center">
              <h2>Login</h2>
            </div>
            {/* Social logins */}
            <div className="row justify-content-center">
              <button
                className="col-10 btn btn-primary"
                type="github"
                onClick={() => signIn('github')}
              >
                Sign up with Github{' '}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <button type="github" onClick={() => signIn('github')}>
      Sign up with GitHub{' '}
    </button>
  );
};

export default Signin;
