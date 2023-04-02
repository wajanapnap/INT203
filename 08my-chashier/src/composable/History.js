const getHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/history");
      if (res.ok) {
        console.log("get successfully");
        const priceList  = await res.json()
        return priceList
      } else {
        throw new Error("cannot get");
      }
    } catch (err) {
      console.log(err);
    }
};
export {getHistory}