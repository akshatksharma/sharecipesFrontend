import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import Nav from "../components/nav";
import Layout from "../components/layout";
import Menu from "../components/menu";

export default function IndexPage() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [session, loading] = useSession();

  const getRecipes = async () => {
    const res = await fetch("http://localhost:5000/api/recipes", {
      method: "GET",
    });
    if (!res.ok) console.log("failure");
    const data = await res.json();
    console.log(data);
    setAllRecipes(data);
    setRecipes(data);
  };

  const getCategories = async () => {
    const res = await fetch("http://localhost:5000/api/recipes/parameters", {
      method: "GET",
    });
    if (!res.ok) console.log("failure");
    const data = await res.json();

    console.log(data);
    const currentCategories = data.categoryRows.map(
      (category) => category.categories[0]
    );
    currentCategories.push("None");
    setCategories(currentCategories);
  };

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const filterRecipesByCategory = (e) => {
    const filter = e.target.id;

    let filteredRecipes = recipes;

    if (filter == "None") {
      filteredRecipes = allRecipes;
    } else {
      filteredRecipes = allRecipes.filter((recipe) =>
        recipe.categories.includes(filter)
      );
    }
    setRecipes(filteredRecipes);
  };

  const filterRecipesByDuration = (e) => {
    const filter = e.target.id;

    let filteredRecipes = recipes;

    if (filter == "NoneDuration") {
      filteredRecipes = allRecipes;
    } else {
      filteredRecipes = allRecipes.filter(
        (recipe) => parseInt(recipe.duration) < parseInt(filter)
      );
    }
    setRecipes(filteredRecipes);
  };

  return (
    <div>
      <Menu isVisible={menuVisible} toggleVisible={toggleMenu}>
        <h3 className="text-xl ml-2 font-semibold">By Category</h3>
        <div className="flex flex-wrap mb-4">
          {categories.map((category) => (
            <button
              key={category}
              id={category}
              className="btn-blue m-2"
              onClick={filterRecipesByCategory}
            >
              {category}
            </button>
          ))}
        </div>
        <h3 className="text-xl ml-2 font-semibold">By Duration (mins)</h3>
        <div className="flex flex-wrap mb-4">
          <button
            className="btn bg-orange-400 m-2"
            id="30"
            onClick={filterRecipesByDuration}
          >
            {"< 30"}
          </button>
          <button
            className="btn bg-orange-500 m-2"
            id="60"
            onClick={filterRecipesByDuration}
          >
            {"< 60"}
          </button>
          <button
            className="btn bg-orange-700 m-2"
            id="120"
            onClick={filterRecipesByDuration}
          >
            {"< 120"}
          </button>
          <button
            className="btn bg-orange-900 m-2"
            id="180"
            onClick={filterRecipesByDuration}
          >
            {"< 180"}
          </button>
          <button
            className="btn bg-gray-500 m-2"
            id="NoneDuration"
            onClick={filterRecipesByDuration}
          >
            {"None"}
          </button>
        </div>
      </Menu>
      <Nav />
      <Layout>
        <div className="flex flex-row justify-between w-full mb-6">
          <h1 className="text-3xl font-bold">Recipes</h1>
          <div className="flex flex-row items-center">
            <Link href={"/create"}>
              <button className="btn-blue h-10 mr-2">Add</button>
            </Link>
            <button className="btn-blue h-10" onClick={toggleMenu}>
              Filter
            </button>
          </div>
        </div>
        <div className="w-full">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <div className="flex flex-col-reverse h-24 p-4 mb-4 border rounded bg-gray-200 ">
                <h2 className="font-bold text-gray-700">{recipe.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
}
