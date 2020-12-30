export const getUserId = async (email) => {
  const encodedURI = encodeURIComponent(email);

  const res = await fetch(`${process.env.BACKEND_URL}/users/${encodedURI}`, {
    method: "GET",
  });

  if (!res.ok) console.log("failure");
  const data = await res.json();

  return await data[0];
};

export const getAllUserIds = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/users/`, {
    method: "GET",
  });

  if (!res.ok) console.log("failure");
  const data = await res.json();

  return await data;
};

export const getUserFavs = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/favorites/${id}`, {
    method: "GET",
  });

  if (!res.ok) console.log("failure");
  const data = await res.json();
  return await data[0];
};

export const getUserRecipes = async (userid) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/recipes/byuser/${userid}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) console.log("failure");
  const data = await res.json();

  return await data;
};
