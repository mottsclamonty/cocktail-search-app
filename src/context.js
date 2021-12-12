import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(
    async (url) => {
      // Start loading at start of fetch
      setLoading(true);
      try {
        const response = await fetch(`${url}${searchTerm}`);
        const data = await response.json();
        const { drinks } = data;
        // If drinks fetched, set cocktails to drinks array. Else set to empty array
        if (drinks) {
          const newCocktails = drinks.map((drink) => {
            const {
              idDrink,
              strDrinkThumb,
              strDrink,
              strAlcoholic,
              strGlass,
              strInstructions,
            } = drink;
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
              instructions: strInstructions,
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
        // Finish loading
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [searchTerm]
  );

  // Re-fetch drinks array every time search term changes
  useEffect(() => {
    fetchDrinks(url);
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        cocktails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// use global context hook to get values of AppContext
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
