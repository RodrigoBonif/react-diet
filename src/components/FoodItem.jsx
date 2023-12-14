import React from "react"

const FoodItem = props => {
    const { 
        index,
        name,
        calories,
        protein,
        checked,
        markedFood,
        deleteFood
    } = props;

    return (
        <tr key={index}>
        <td>{name}</td>
        <td>{calories}</td>
        <td>{protein}</td>
        <td>
            <input
            type="checkbox"
            onChange={() => markedFood(index)}
            checked={checked}
            />
        </td>
        <td>
            <button onClick={() => deleteFood(index)}>Excluir</button>
        </td>
    </tr>
    )
}

export default FoodItem;
