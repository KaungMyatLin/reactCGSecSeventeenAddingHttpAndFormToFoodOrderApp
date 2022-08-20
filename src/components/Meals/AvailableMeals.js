import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, sethttpError] = useState(null)

  useEffect(() => {
    const fetchMeal = async() => {
      const response = await fetch('https://react-http-f4d4c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

    // async function fetchData() {
      //   const response = await fetch( '');
      //   const responseData = await response.json();
      // }

    // below code has very hard to find bug. Throwing Error inside promise causes to reject().
    // we cant use trycatch() to warp it unless we also await fetchMeal() turning it into async function
    // try{
    //   fetchMeal();
    // }catch (error) {
    //   setIsLoading(false)
    //   sethttpError(error.message)
    // }

    // a workaround is putting trycatch into separate function().
    // or use the catch() method on fetch promise.
    fetchMeal().catch(error => {
      setIsLoading(false)
      sethttpError(error.message)
    })
  },[])

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading ....</p>
    </section>
  }
  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
