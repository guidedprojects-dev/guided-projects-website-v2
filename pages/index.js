import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        This is the head
        <title>Guided Projects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        This is the body
        <button className="btn btn-primary">Test</button>
      </main>

      <footer>this is the footer</footer>
    </div>
  );
}
