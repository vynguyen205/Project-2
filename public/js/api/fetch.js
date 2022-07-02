async function getData(url) {
    const fetchData = await fetch(`http://localhost:3001/${url}`,{
      method: "GET",
      // body: {
      //   username: variable,
      //   // ...allThecolsInTheModel-id
      // }
    })
    const dataReturn = await fetchData.json();
    return dataReturn;
}