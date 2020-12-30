import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Nav from "../../components/nav";
import Link from "next/link";
import { useSession, getSession } from "next-auth/client";
import { getAllUserIds, getUserRecipes } from "../../lib/getUserInfo";
import { getRecipesByIds } from "../../lib/getRecipes";

export default function Profile({ profileData }) {
  const [session, loading] = useSession();
  const [userFavRecipes, setUserFavRecipes] = useState([]);

  const getFavorites = async () => {
    const session = await getSession();
    const userFavs = await session.user.favorites;

    if (userFavs) {
      const favRecipes = await getRecipesByIds(userFavs);
      setUserFavRecipes(await favRecipes);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Nav></Nav>
      {session && (
        <div className="flex items-center mb-8 p-4 bg-gray-300">
          <img
            className="w-1/2 h-auto rounded-full mr-6 "
            referrerPolicy="no-referrer"
            src={session.user.image}
            alt="User profile picture"
          />
          <div className="break-all flex flex-col justify-center">
            <h2>Name</h2>
            <h1 className="font-bold text-lg">{session.user.name}</h1>
            {/* <h2>Email</h2> */}
            {/* <h1 className="font-bold text-lg">{session.user.email}</h1> */}
          </div>
        </div>
      )}
      <Layout>
        <div className="w-full mb-6">
          <h2 className="text-lg font-bold mb-2">Favorite Recipes</h2>
          {userFavRecipes.map((recipe) => {
            if (recipe) {
              return (
                <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                  <div className="flex flex-col-reverse h-24 p-4 mb-4 border rounded bg-gray-200 ">
                    <h2 className="font-bold text-gray-700">{recipe.title}</h2>
                  </div>
                </Link>
              );
            }
          })}
        </div>
        <div className="w-full ">
          <h2 className="text-lg font-bold mb-2">My recipes</h2>
          {profileData.userRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <div className="flex flex-col-reverse h-24 p-4 mb-4 border rounded bg-gray-200 ">
                <h2 className="font-bold text-gray-700">{recipe.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const ids = await getAllUserIds();

  console.log(ids);

  const params = await ids.map((userid) => {
    return {
      params: {
        id: `${userid.id}`,
      },
    };
  });

  const data = { paths: params, fallback: false };
  console.log(data);

  return data;
}

export async function getStaticProps({ params }) {
  const profileData = await getPostData(params.id);
  return {
    props: {
      profileData,
    },
  };
}

export async function getPostData(id) {
  const userRecipes = await getUserRecipes(id);

  return { id, userRecipes };
}
