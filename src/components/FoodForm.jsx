import React from "react"

const FoodForm = props => {
    const { total, saveFood } = props;

    return (
        <div className="foodForm">
            <input type="text" id="name" placeholder=" Informe o nome" />
            <input type="number" id="calories" placeholder=" Informe as calorias" />
            <input type="number" id="protein" placeholder=" Informe as proteínas" />
            <button onClick={saveFood}>salvar</button>
            {total.calories ? (
            <div className="foodTotal">
                <h2>Calorias: {total.calories}g</h2>
                <h2>Proteinas: {total.protein}g</h2>
            </div>
            ) : ""}
        </div>
    )
}

export default FoodForm;
