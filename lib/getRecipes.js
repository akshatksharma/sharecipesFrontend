export const getRecipes = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/recipes`, {
    method: "GET",
  });
  if (!res.ok) console.log("failure");
  const data = await res.json();

  return await data;
};

export const getRecipeById = async (id) => {
  const res = await fetch(`${process.env.BACKEND_URL}/recipes/${id}`, {
    method: "GET",
  });

  if (!res.ok) console.log("failure");
  const data = await res.json();

  return await data[0];
};

export const getRecipesByIds = async (postids) => {
  const postData = { ids: postids };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes/ids`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }
  );
  console.log(res);
  if (!res.ok) console.log("failure");
  const data = await res.json();

  return await data;
};
