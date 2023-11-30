// MyContext.js
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [myVariable, setMyVariable] = useState(null);
  const [managerId, setManagerId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [money, setMoney] = useState(null);
  const [type, setType] = useState(null);



  return (
    <MyContext.Provider value={{ money, setMoney,type, setType, myVariable, setMyVariable, managerId, setManagerId, roomId, setRoomId , customerId, setCustomerId}}>
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
