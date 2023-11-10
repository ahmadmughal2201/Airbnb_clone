// MyContext.js
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [myVariable, setMyVariable] = useState(null);
  const [managerId, setManagerId] = useState(null);

  return (
    <MyContext.Provider value={{ myVariable, setMyVariable, managerId, setManagerId }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { MyProvider, useMyContext };
