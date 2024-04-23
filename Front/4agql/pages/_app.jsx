import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'
import { loginClient } from '@/lib/apolloClient'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={loginClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
