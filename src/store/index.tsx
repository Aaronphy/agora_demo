import React from 'react';
import ClientStore from './client';

export const stores = Object.freeze({
  clientStore: new ClientStore()
});

export const storesContext = React.createContext(stores);

export const StoresProvider = storesContext.Provider;
