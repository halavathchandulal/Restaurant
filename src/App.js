import React from 'react'
import RestaurantComponent from './components/RestaurantComponent'

import './App.css'

const App = () => {
  // Sample data for categoryDetails and activeCategory
  const categoryDetails = {
    dish_name: 'Salad',
    dish_currency: 'USD',
    dish_price: 10.99,
    dish_description: 'Fresh and healthy salad',
    dish_calories: 250,
    dish_image: 'path_to_image',
  }

  const activeCategory = 'Salads and Soup'

  return (
    <div>
      <RestaurantComponent />
      <MenuCategoryDetails
        activeCategory={activeCategory}
        categoryDetails={categoryDetails}
      />
    </div>
  )
}

export default App
