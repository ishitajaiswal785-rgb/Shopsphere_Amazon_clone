import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shopsphere_user');
      return savedUser ? JSON.parse(savedUser) : {
        name: "Rahul",
        fullName: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        addressLine: "Flat 402, Prestige Tower, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2mMCTINyv_GP05-EIHffwEXQoCOKLbmc2X6rNplUWVaPRxQphxA57o6hXQnYJYJSeEFZpiol4g4Q4JWCKd0X5kiatmsu2Mhw9Ces4yw4F5NLlsBO2QaIXUuvtKfcXcnGhNXP20vmk9tPQ5gm7Up4_gpVYKxyoqP62sGRvMXuYKi_bXwsjkjzVFaxlLQjB_4I0_aQYJPCZR32xB5aaUYwayfPpz3IVbQLcBpCW-s",
        isLoggedIn: true
      };
    } catch (e) {
      return null;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('shopsphere_orders');
      return savedOrders ? JSON.parse(savedOrders) : [
        {
          orderId: "SS-IND-94821034",
          orderDate: "10 Nov 2026",
          total: 899,
          status: "Delivered",
          deliveryDate: "11 Nov 2026",
          items: [
            {
              id: "solimo-bedsheet-king-size",
              name: "Amazon Brand - Solimo 100% Pure Cotton King Size Bedsheet",
              quantity: 1,
              price: 899,
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo3-EmwiIcL52RZ7op5y75DbWK7AaeF5FoSYYZjUi5G4mBdFdVATu_tuws8Y3ZuRnJ3WIdaD-bEPeUG9cOp66nT6wEltpwej1rJaZFBCKjsffPYjclw9gxS18TQu24jIUtYWOFjgdxUmZHpzyGHbpbFBu-VUzNJ6FILLpyXXWphJZr7xM0ckO-JLxqpyL1VDjifZsXcOZijN6XIMma15LM02OyKM4_pcYtQeLxtuA"
            }
          ]
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shopsphere_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shopsphere_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const login = (email, password) => {
    const defaultUser = {
      name: email.split('@')[0],
      fullName: email.split('@')[0].toUpperCase(),
      email: email,
      phone: "+91 98765 43210",
      addressLine: "Flat 402, Prestige Tower, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2mMCTINyv_GP05-EIHffwEXQoCOKLbmc2X6rNplUWVaPRxQphxA57o6hXQnYJYJSeEFZpiol4g4Q4JWCKd0X5kiatmsu2Mhw9Ces4yw4F5NLlsBO2QaIXUuvtKfcXcnGhNXP20vmk9tPQ5gm7Up4_gpVYKxyoqP62sGRvMXuYKi_bXwsjkjzVFaxlLQjB_4I0_aQYJPCZR32xB5aaUYwayfPpz3IVbQLcBpCW-s",
      isLoggedIn: true
    };
    setUser(defaultUser);
    return true;
  };

  const signup = (fullName, email, phone, password) => {
    const newUser = {
      name: fullName.split(' ')[0],
      fullName: fullName,
      email: email,
      phone: phone,
      addressLine: "Indiranagar 100ft Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2mMCTINyv_GP05-EIHffwEXQoCOKLbmc2X6rNplUWVaPRxQphxA57o6hXQnYJYJSeEFZpiol4g4Q4JWCKd0X5kiatmsu2Mhw9Ces4yw4F5NLlsBO2QaIXUuvtKfcXcnGhNXP20vmk9tPQ5gm7Up4_gpVYKxyoqP62sGRvMXuYKi_bXwsjkjzVFaxlLQjB_4I0_aQYJPCZR32xB5aaUYwayfPpz3IVbQLcBpCW-s",
      isLoggedIn: true
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateDeliveryAddress = (newAddress) => {
    setUser(prev => ({
      ...prev,
      ...newAddress
    }));
  };

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        signup,
        logout,
        updateDeliveryAddress,
        addOrder
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
