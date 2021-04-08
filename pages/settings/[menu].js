import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const mockData = {
  _id: 'test_id',
  username: 'username',
  password: 'password',
};

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
            <h4>{mockData.username}</h4>
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
                className="link-group"
              >
                <Link href="/profile/test">Test</Link>
                <Link href="/profile/test2">Test2</Link>
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
