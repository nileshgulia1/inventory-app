export const fetchInventory = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    const data = await response.json();
    dispatch({ type: "SET_INVENTORY", payload: data });
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
  }
};
