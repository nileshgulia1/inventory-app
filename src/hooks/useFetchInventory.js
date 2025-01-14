import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchInventory = (url="https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory", options={}) => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        url,options
      );
      const data = await response.json();
      dispatch({ type: "SET_INVENTORY", payload: data });
    } catch (err) {
      setError(err.message || "Failed to fetch inventory.");
      console.error("Failed to fetch inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //

  return { inventory, loading, error, refetch: fetchInventory };
};

export default useFetchInventory;
