export const changeFavs = async ({ userId, updatedFavs }) => {
  const postData = { userId, updatedFavs };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  console.log(res);
  if (!res.ok) console.log("failure");
};
