export const addRecipe = async (data) => {
  const postData = data;

  const res = await fetch(`${process.env.BACKEND_URL}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  console.log(res);
  if (!res.ok) console.log("failure");
};
