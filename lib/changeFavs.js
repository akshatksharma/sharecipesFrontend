export const changeFavs = async ({ userId, updatedFavs }) => {
  const postData = { userId, updatedFavs };

  const res = await fetch(`${process.env.BACKEND_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  console.log(res);
  if (!res.ok) console.log("failure");
};
