import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MenuCategoryDetails from './components/MenuCategoryDetails'

const RestaurantComponent = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [menuCategories, setMenuCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [categoryDetails, setCategoryDetails] = useState(null)
  const [dishQuantities, setDishQuantities] = useState({})
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099',
        )

        const data = response.data

        setRestaurantName(data.restaurant_name)
        setMenuCategories(data.table_menu_list)
        initializeDishQuantities(data.table_menu_list)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const initializeDishQuantities = categories => {
    const quantities = {}
    categories.forEach(category => {
      category.category_dishes.forEach(dish => {
        quantities[dish.dish_name] = 0
      })
    })
    setDishQuantities(quantities)
  }

  const handleCategoryClick = category => {
    setActiveCategory(category.menu_category)

    if (category.menu_category === 'From the Barnyard') {
      const firstDish = category.category_dishes[0]
      setCategoryDetails(firstDish)
    } else {
      setCategoryDetails(null)
    }
  }

  const incrementCartCount = () => {
    setCartCount(prevCount => prevCount + 1)
  }

  const decrementCartCount = () => {
    if (cartCount > 0) {
      setCartCount(prevCount => prevCount - 1)
    }
  }

  return (
    <div>
      <h1>UNI Resto Cafe {restaurantName && ` - ${restaurantName}`}</h1>

      {/* Display menu categories as buttons */}
      <div>
        {menuCategories.map((category, index) => (
          <button key={index} onClick={() => handleCategoryClick(category)}>
            {category.menu_category}
          </button>
        ))}
      </div>

      {/* Display dish quantities for "From the Hen House" */}
      {activeCategory === 'From the Hen House' && (
        <div>
          <h2>Dish Quantities:</h2>
          {Object.entries(dishQuantities).map(([dishName, quantity]) => (
            <div key={dishName}>
              <p>{`${dishName}: ${quantity}`}</p>
              <button onClick={() => decrementQuantity(dishName)}>-</button>
              <button onClick={() => incrementQuantity(dishName)}>+</button>
            </div>
          ))}
        </div>
      )}

      {/* Display menu details for active category */}
      <MenuCategoryDetails
        activeCategory={activeCategory}
        categoryDetails={categoryDetails}
        incrementCartCount={incrementCartCount}
        decrementCartCount={decrementCartCount}
        cartCount={cartCount}
      />
    </div>
  )
}

export default RestaurantComponent
