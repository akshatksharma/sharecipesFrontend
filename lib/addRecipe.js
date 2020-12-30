export const addRecipe = async (data) => {
  const postData = data;

  const res = await fetch(`http://localhost:5000/api/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  console.log(res);
  if (!res.ok) console.log("failure");
};
