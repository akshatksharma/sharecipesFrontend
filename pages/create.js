import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/client";

import { addRecipe } from "../lib/addRecipe";

import Nav from "../components/nav";
import Layout from "../components/layout";

export default function CreatePage() {
  const [session, loading] = useSession();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [categories, setCategories] = useState([]);

  const blankIngredient = "";
  const [ingredients, setIngredients] = useState([blankIngredient]);

  const blankDirection = "";
  const [directions, setDirections] = useState([blankDirection]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const categories = e.target.value.split(", ");
    setCategories(categories);
  };

  const handleIngredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.idx] = e.target.value;

    setIngredients(updatedIngredients);
  };

  const handleDirectionChange = (e) => {
    const updatedDirections = [...directions];
    updatedDirections[e.target.dataset.idx] = e.target.value;

    setDirections(updatedDirections);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, blankIngredient]);
  };

  const addDirection = () => {
    setDirections([...directions, blankDirection]);
  };

  const removeIngredient = (e) => {
    const whichToRemove = e.target.dataset.idx;

    console.log(whichToRemove);

    const filteredArray = ingredients.filter(
      (ingredient, index) => index != whichToRemove
    );

    setIngredients(filteredArray);
  };

  const removeDirection = (e) => {
    const whichToRemove = e.target.dataset.idx;

    console.log(whichToRemove);

    const filteredArray = directions.filter(
      (direction, index) => index != whichToRemove
    );

    setDirections(filteredArray);
  };

  const uploadData = () => {
    const data = {
      title: title,
      duration: duration,
      categories: categories,
      ingredients: ingredients,
      directions: directions,
      userid: session.user.id,
    };

    addRecipe(data);

    setTitle("");
    setDuration("");
    setCategories([]);
    setIngredients([blankIngredient]);
    setDirections([blankDirection]);
  };

  return (
    <div>
      <Nav></Nav>
      <Layout>
        <div className="w-full">
          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold text-xl" htmlFor="title">
              Title
            </label>
            <input
              className="border-b h-12 bg-gray-200 p-2"
              type="text"
              name="title"
              id="title"
              onChange={handleTitleChange}
              value={title}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold text-xl" htmlFor="title">
              Duration (minutes)
            </label>
            <input
              className="border-b h-12 bg-gray-200 p-2"
              type="text"
              name="duration"
              id="duration"
              onChange={handleDurationChange}
              value={duration}
              placeholder="ex: 80 minutes"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold text-xl" htmlFor="title">
              Categories
            </label>
            <input
              className="border-b h-12 bg-gray-200 p-2"
              type="text"
              name="categories"
              id="categories"
              onChange={handleCategoryChange}
              value={categories.join(", ")}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold text-xl">Ingredients</label>
            {ingredients.map((item, idx) => {
              const nameId = `ingredient-${idx}`;
              return (
                <div key={`ingredient-${idx}`} className="mb-2">
                  <div className="flex items-center">
                    <button
                      data-idx={idx}
                      className="btn-red mr-4 h-8 py-0"
                      onClick={removeIngredient}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      name={nameId}
                      data-idx={idx}
                      id={nameId}
                      className="border-b h-12 bg-gray-200 p-2 w-full"
                      onChange={handleIngredientChange}
                      value={item}
                    />
                  </div>
                </div>
              );
            })}
            <input
              className="btn-blue"
              type="button"
              value="Add Ingredient"
              onClick={addIngredient}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold text-xl">Directions</label>

            {directions.map((direction, idx) => {
              const nameId = `direction-${idx}`;
              return (
                <ol key={`direction-${idx}`} className="mb-2">
                  <li className="flex items-center">
                    <button
                      data-idx={idx}
                      className="btn-red mr-4 h-8 py-0"
                      onClick={removeDirection}
                    >
                      -
                    </button>
                    <p className="text-lg font-bold mr-4">{`${idx + 1}.`}</p>
                    <input
                      type="text"
                      name={nameId}
                      data-idx={idx}
                      id={nameId}
                      className="border-b h-12 bg-gray-200 p-2 w-full"
                      onChange={handleDirectionChange}
                      value={direction}
                    />
                  </li>
                </ol>
              );
            })}
            <input
              className="btn-blue"
              type="button"
              value="Add Direction"
              onClick={addDirection}
            />
          </div>
          <input
            className="w-full mt-8 btn bg-blue-800"
            type="submit"
            value="Submit"
            onClick={uploadData}
          />
        </div>
      </Layout>
    </div>
  );
}
