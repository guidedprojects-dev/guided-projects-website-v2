import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter();
  const { menu } = router.query;

  return (
    <div className="container">
      <Head>
        <title>Your Profile</title>
      </Head>
      <main>
        <div className="container-fluid">
          <div className="row title-wrapper p-3">
            <h4>Username</h4>
          </div>
          <div className="row content-wrapper">
            {/* Menu Sidebar*/}
            <div className="col-md-2 col-sm-12">
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Should make custom ActiveLink component */}
                <Link href="account">Account</Link>
                <Link href="test">Test</Link>
              </div>
            </div>
            {/* Inputs Main */}
            {/* Should load in selected menu component here */}
            <div className="col-md-9 col-sm-12">{menu}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
