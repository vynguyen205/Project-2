//These are all the view routes for your application
async function getData(url) {
  const fetchData = await fetch(`http://localhost:3001/${url}`, {});
  const dataReturn = await fetchData.json();
  return dataReturn;
}

//getting all users
getData(`api/users/`)
  .then((data) => console.log(`users`, data))
  .catch((err) => console.log(err));
//getting all rooms
getData(`api/rooms/`)
  .then((data) => console.log(`rooms`, data))
  .catch((err) => console.log(err));
//getting all words
getData(`api/words/`)
  .then((data) => console.log(`words`, data))
  .catch((err) => console.log(err));
