import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {ApolloClient, ApolloProvider, InMemoryCache,  HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const root = ReactDOM.createRoot(document.getElementById('root'));

const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
      graphqlErrors.map(({message, location, path})=>{
          alert(`Graphql Error: ${message}`)
      })
  }
})
const myLink = from([
  errorLink,
  new HttpLink({uri: "https://countries.trevorblades.com"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: myLink,
})


root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
