import React, { useCallback, useEffect, useState } from "react";
import styles from './FoodMenu.module.css'
import FoodItem from "./FoodItem";
import axios from "axios";

const FoodMenu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchMeals = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://food-order-app-react-a9f51-default-rtdb.firebaseio.com/Meals.json');
            if(response.status !== 200) throw new Error('Something went wrong');
            const data = await response.data;
            if(!data)    throw new Error('No data found');
            const foods = [];
            for(const key in data) {
                foods.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }
            setFoodItems(foods);
            setIsLoading(false);
        }
        catch(error) {
            setErrorMessage(error.message);
            setIsLoading(false);
            console.log(error.stack, error.status);
        }
    }, []);
    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);
    // const foodItems = [
    //     {
    //         id: '1',
    //         name: 'Pizza',
    //         description: 'Topping on pizza base',
    //         price: 299,
    //     },
    //     {
    //         id: '2',
    //         name: 'Manchurian gravy',
    //         description: 'Chinese gravy filled with balls',
    //         price: 139,
    //     },
    //     {
    //         id: '3',
    //         name: 'Manchurian dry',
    //         description: 'dry manchurian balls',
    //         price: 139,
    //     },
    //     {
    //         id: '4',
    //         name: 'Dosa',
    //         description: 'Dosa with sambhar and chuteny',
    //         price: 149,
    //     },
    //     {
    //         id: '5',
    //         name: 'Uttapam',
    //         description: 'Uttapam with sambhar and chuteny',
    //         price: 139,
    //     },
    //     {
    //         id: '6',
    //         name: 'Chinese Noodles',
    //         description: 'Noodles filled with vegetables & manchurian',
    //         price: 139,
    //     },
    // ];
    
    // axios.get('https://food-order-app-react-a9f51-default-rtdb.firebaseio.com/Meals.json')
    //     .then(response => {
    //         const data = response.data;
    //     })


    return (
        <div className={styles['food-menu']}>
            {isLoading && <p className={styles['loading']}>Loading food items....</p>}
            {!isLoading && !errorMessage && foodItems.map(item => {
                return <FoodItem key={item.id} id={item.id} name={item.name} desc={item.description} price={item.price}></FoodItem>
            })}
            {errorMessage && <p className={styles['error']}>{errorMessage}</p>}
        </div>
    )
}

export default FoodMenu;