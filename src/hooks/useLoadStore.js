import { useContext, useEffect } from "react";
import YourStoreAPI from "../api";
import UserContext from "../contexts/UserContext";

function useLoadStore(storeId) {
  const { currentStore, setCurrentStore } = useContext(UserContext);

  async function loadStore(storeIdParam, storeIdCurrent) {
    try {
      if (storeIdParam !== storeIdCurrent && storeIdParam !== undefined) {
        const store = await YourStoreAPI.getStore(storeIdParam);
        setCurrentStore(store);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    loadStore(storeId, currentStore?.storeId);
  }, [storeId]);

  return {
    currentStore,
  };
}

export default useLoadStore;
