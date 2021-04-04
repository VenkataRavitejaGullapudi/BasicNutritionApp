import React, { useEffect, useState } from 'react'
const Food = ({ props }) => {
    const DefaultCurentFood = {
        name: "-",
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fibre: 0,
        weight: 0
    }
    const [foods, setFoods] = useState([])
    const [searchedFoods, setSearchedFoods] = useState([])
    const [currentFood, setCurrentFood] = useState(DefaultCurentFood)

    useEffect(() => {
        fetch("http://localhost:8081/foods")
            .then((res) => res.json())
            .then((foods) => {
                setFoods(foods.payload)
                setSearchedFoods(foods.payload)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const searchFood = (event) => {
        let searchFoods = foods.filter((food, index) => {
            return food.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setSearchedFoods(searchFoods)
        setCurrentFood(DefaultCurentFood)

    }

    const selectFood = (food) => {
        setCurrentFood(food)
    }

    const calculateChanges = (weight) => {
        if(!weight) return
        let currFood = currentFood
        currFood.calories = Number((currFood.calories * weight) / currFood.weight)
        currFood.carbs = Number((currFood.carbs * weight) / currFood.weight)
        currFood.protein = Number((currFood.protein * weight) / currFood.weight)
        currFood.fats = Number((currFood.fats * weight) / currFood.weight)
        currFood.fibre = Number((currFood.fibre * weight) / currFood.weight)
        currFood.weight = weight
        setCurrentFood({ ...currentFood, ...currFood })
    }

    return <React.Fragment >
        <div className="container">
            <div className="form-group" style={{ marginTop: "30px" }}>
                <input className="form-control" placeholder="Search Food" onChange={(event) => { searchFood(event) }} />
            </div>
            <div className="search-result">
                {searchedFoods.map((food, index) => {
                    return <div key={index} onClick={() => selectFood(food)} className="result p-2 m-3" style={{ border: "1px solid white", borderRadius: "20px" }}>
                        {food.name}
                    </div>
                })}
            </div>
            {currentFood.name === "-" ?
                <div></div>
                :
                <div className="product-display">
                    <p>Your selected food contains</p>
                    <table className="table table-hover table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Calories</th>
                                <th>Proteins</th>
                                <th>Carbs</th>
                                <th>Fibres</th>
                                <th>Fats</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{currentFood.name}</td>
                                <td>{currentFood.calories.toFixed(1)}</td>
                                <td>{currentFood.protein.toFixed(1)}</td>
                                <td>{currentFood.carbs.toFixed(1)}</td>
                                <td>{currentFood.fibre.toFixed(1)}</td>
                                <td>{currentFood.fats.toFixed(1)}</td>
                                <td>
                                    <input type="number" onChange={(event)=>calculateChanges(Number(event.target.value))} value={currentFood.weight} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    </React.Fragment>
}

export default Food