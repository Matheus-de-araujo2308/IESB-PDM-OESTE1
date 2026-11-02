import React, { createContext, useContext, useState } from 'react';

const ExpensesContext = createContext();

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([
    { id: 'e1', description: 'Livros de React Native', amount: 120.0 },
    { id: 'e2', description: 'Café e Lanches', amount: 45.5 },
    { id: 'e3', description: 'Transporte', amount: 84.0 },
  ]);

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}