import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import Nprogress from 'nprogress';
import { Component } from 'react';

import Page from '../components/Page';
import withData from '../lib/withData';

import '../components/styles/nprogress.css';
// Todo: swap with our own
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
//  if any of the pages have getInitialsProps method on them,then we're going to wait and fetch it
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return pageProps;
};
// what this does is give me (myApp) but injects the apollo client along inside of it
export default withData(MyApp);
