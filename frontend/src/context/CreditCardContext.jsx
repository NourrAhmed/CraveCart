import { createContext, useContext, useState, useEffect } from "react";
import { creditCardAPI } from "../config/api";

const CreditCardContext = createContext();

export const useCreditCard = () => {
  const context = useContext(CreditCardContext);
  if (!context) {
    throw new Error("useCreditCard must be used within a CreditCardProvider");
  }
  return context;
};

export const CreditCardProvider = ({ children }) => {
  const [creditCards, setCreditCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCreditCards = async () => {
    try {
      setLoading(true);
      const response = await creditCardAPI.getAll();
      setCreditCards(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch credit cards");
    } finally {
      setLoading(false);
    }
  };

  const addCreditCard = async (cardData) => {
    try {
      setLoading(true);
      const response = await creditCardAPI.add(cardData);
      setCreditCards((prev) => [...prev, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add credit card");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCreditCard = async (cardId) => {
    try {
      setLoading(true);
      await creditCardAPI.delete(cardId);
      setCreditCards((prev) => prev.filter((card) => card._id !== cardId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete credit card");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultCard = async (cardId) => {
    try {
      setLoading(true);
      await creditCardAPI.setDefault(cardId);
      setCreditCards((prev) =>
        prev.map((card) => ({
          ...card,
          isDefault: card._id === cardId,
        }))
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to set default card");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreditCards();
  }, []);

  const value = {
    creditCards,
    loading,
    error,
    addCreditCard,
    deleteCreditCard,
    setDefaultCard,
    fetchCreditCards,
  };

  return (
    <CreditCardContext.Provider value={value}>
      {children}
    </CreditCardContext.Provider>
  );
};

export default CreditCardContext;
