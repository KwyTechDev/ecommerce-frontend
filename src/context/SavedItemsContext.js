import React, { createContext, useState } from 'react';

export const SavedItemsContext = createContext();

export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  const addSavedItem = (item) => {
    setSavedItems((prevItems) => [...prevItems, item]);
  };

  const removeSavedItem = (itemId) => {
    setSavedItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, addSavedItem, removeSavedItem }}>
      {children}
    </SavedItemsContext.Provider>
  );
};
