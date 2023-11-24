import type { AppProps } from 'next/app'
import Head from 'next/head';
import Router from 'next/router';
import './globals.css'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  return (
    <main className='w-full h-full'>
      <Head>
        <title>IronHold</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </main>
  );
};
