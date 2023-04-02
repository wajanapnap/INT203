const getCashier = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/history/${id}`);
      if (res.ok) {
        console.log("get successfully");
        const priceEdit  = await res.json()
        return priceEdit
      } else {
        throw new Error("cannot get");
      }
    } catch (err) {
      console.log(err);
    }
};
export {getCashier}