import { Component } from 'react';
import Page from '../components/Page';

export default function Myapp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
