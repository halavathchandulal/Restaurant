import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MenuCategoryDetails = ({
  activeCategory,
  categoryDetails,
  incrementCartCount,
  decrementCartCount,
  cartCount,
}) => {
  const [menuCategoryDetails, setMenuCategoryDetails] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
        )

        const data = response.data

        const categoryDetailsForActiveCategory = data.find(
          item => item.category === activeCategory,
        )

        if (categoryDetailsForActiveCategory) {
          setMenuCategoryDetails(
            categoryDetailsForActiveCategory.category_dishes[0],
          )
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (activeCategory === 'From the Barnyard') {
      fetchData()
    } else {
      setMenuCategoryDetails(null)
    }
  }, [activeCategory])

  if (activeCategory !== 'From the Barnyard' || !menuCategoryDetails) {
    return null
  }

  const {
    dish_name,
    dish_currency,
    dish_price,
    dish_description,
    dish_calories,
    dish_image,
  } = menuCategoryDetails

  return (
    <div>
      <h2>{dish_name}</h2>
      <p>{`${dish_currency} ${dish_price}`}</p>
      <p>{dish_description}</p>
      <p>Calories: {dish_calories}</p>
      <img src={dish_image} alt={dish_name} />
      {activeCategory === 'Salads and Soup' && (
        <div>
          <button onClick={incrementCartCount}>+</button>
          <button onClick={decrementCartCount}>-</button>
          <p>Cart Count: {cartCount}</p>
        </div>
      )}
    </div>
  )
}

export default MenuCategoryDetails
