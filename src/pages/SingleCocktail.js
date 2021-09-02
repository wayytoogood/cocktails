import React, { useState, useEffect, useCallback } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const [loading, setLoading] = useState(true)
  const [cocktail, setCocktail] = useState(null)

  const { id } = useParams()

  const getData = useCallback(async () => {
    try {
      const response = await fetch(`${url}${id}`)
      const data = await response.json()

      const drink = data.drinks

      if (drink) {
        const {
          strDrink: name,
          strCategory: category,
          strAlcoholic: info,
          strGlass: glass,
          strInstructions: instructions,
          strDrinkThumb: image,
          strIngredient1: ing1,
          strIngredient2: ing2,
          strIngredient3: ing3,
          strIngredient4: ing4,
          strIngredient5: ing5,
        } = drink[0]

        const ingredients = [ing1, ing2, ing3, ing4, ing5].filter(
          (item) => item
        )

        const currentCocktail = {
          name,
          category,
          info,
          glass,
          instructions,
          image,
          ingredients,
        }
        setCocktail(currentCocktail)
      } else {
        setCocktail(null)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getData()
  }, [id, getData])

  if (loading) {
    return <Loading />
  }

  if (!cocktail) {
    return <h2 className='section-title'>no cocktail to display</h2>
  }

  const { name, category, info, glass, instructions, image, ingredients } =
    cocktail

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions: </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients.map((item, index) => {
              return <span key={index}> {item}</span>
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
