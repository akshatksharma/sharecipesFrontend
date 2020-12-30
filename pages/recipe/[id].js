import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import { useSession, getSession } from "next-auth/client";

import { getRecipes, getRecipeById } from "../../lib/getRecipes";
import { changeFavs } from "../../lib/changeFavs";

export default function Recipe({ recipeData }) {
  const [session, loading] = useSession();
  const [isFavorite, setFavorite] = useState(false);

  const checkIfFav = async () => {
    const aSession = await getSession();
    const userFavs = await aSession.user.favorites;
    const recipeIdInt = parseInt(recipeData.id);
    if (userFavs.includes(recipeIdInt)) setFavorite(true);
  };

  const addFav = async () => {
    const aSession = await getSession();
    const userId = await aSession.user.id;
    const userFavs = await aSession.user.favorites;
    const recipeIdInt = parseInt(recipeData.id);

    const updatedFavs = [...userFavs, recipeIdInt];
    aSession.user.favorites = updatedFavs;
    changeFavs({ userId, updatedFavs });
    setFavorite(true);
  };

  const unFav = async () => {
    const aSession = await getSession();
    const userId = await aSession.user.id;
    const userFavs = await aSession.user.favorites;
    const recipeIdInt = parseInt(recipeData.id);
    const updatedFavs = userFavs.filter((fav) => fav != recipeIdInt);

    changeFavs({ userId, updatedFavs });
    setFavorite(false);
  };

  useEffect(() => {
    console.log(session);
    if (session) checkIfFav();
  }, [session]);

  return (
    <div>
      <Nav></Nav>
      <Layout>
        <div className="flex flex-row-reverse w-full mb-6">
          {session && (
            <>
              {isFavorite === true && (
                <button className="btn-red" onClick={unFav}>
                  Unfav
                </button>
              )}
              {isFavorite === false && (
                <button className="btn-blue" onClick={addFav}>
                  Fav
                </button>
              )}
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold w-full mb-8">
          {recipeData.recipe.title}
        </h1>
        <div className="w-full mb-6">
          <h2 className="texl-xl font-bold w-full">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipeData.recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="w-full mb-6">
          <h2 className="texl-xl font-bold w-full">Directions</h2>
          <ol className="list-decimal list-inside">
            {recipeData.recipe.directions.map((direction, index) => (
              <li key={index} className="mb-4">
                {direction}
              </li>
            ))}
          </ol>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  let recipes = await getRecipes();

  const params = await recipes.map((recipe) => {
    return {
      params: {
        id: `${recipe.id}`,
      },
    };
  });

  const data = { paths: params, fallback: false };
  return data;
}

export async function getStaticProps({ params }) {
  const recipeData = await getPostData(params.id);
  return {
    props: {
      recipeData,
    },
  };
}

export async function getPostData(id) {
  const recipe = await getRecipeById(id);

  return { id, recipe };
}
