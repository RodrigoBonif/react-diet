import React, { useState, useEffect, useMemo } from "react";
import FoodForm from "./FoodForm";
import FoodItem from "./FoodItem"

const DietTable = () => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("dietData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [total, setTotal] = useState({ calories: 0, protein: 0 });

  useEffect(() => {
    localStorage.setItem("dietData", JSON.stringify(data));

    const newTotal = data.reduce(
      (acc, item) => {
        const calories = item.checked ? item.calories : 0;
        const protein = item.checked ? item.protein : 0;

        return {
          calories: acc.calories + calories,
          protein: acc.protein + protein,
        };
      },
      { calories: 0, protein: 0 }
    );

    setTotal(newTotal);
  }, [data]);

  
  
  const FoodItemMemo = useMemo(() => {
    const deleteFood = index => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    };

    const markedFood = index => {
      const newData = [...data];
      newData[index].checked = !newData[index].checked;
      setData(newData);
    };

    
    return data.map((item, index) => (
        <FoodItem
          index={index}
          name={item.name}
          calories={item.calories}
          protein={item.protein}
          checked={item.checked}
          markedFood={markedFood}
          deleteFood={deleteFood}
        />
    ))
  }, [data])

  const FoodFormMemo = useMemo(() => {
    const saveFood = () => {
      const nameInput = document.getElementById("name");
      const caloriesInput = document.getElementById("calories");
      const proteinInput = document.getElementById("protein");
    
      const name = nameInput.value.trim();
      const calories = caloriesInput.value.trim();
      const protein = proteinInput.value.trim();
    
      if (!name || !calories || !protein) {
        return;
      }
    
      setData([
          ...data, 
          { name, 
              calories: Number(calories), 
              protein: Number(protein), 
              checked: false 
          }
      ]);
    
      nameInput.value = "";
      caloriesInput.value = "";
      proteinInput.value = "";
    };

    return (
      <FoodForm
        total={total}
        saveFood={saveFood}
      />
    );
  }, [data, total])

  return (
    <>
      <div className="foodTable">
        <table>
          <thead>
            <tr>
              <th>Alimento</th>
              <th>Calorias</th>
              <th>Proteínas</th>
              <th>Consumido</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {FoodItemMemo}
          </tbody>
        </table>
      </div>
      {FoodFormMemo}
    </>
  );
};

export default DietTable;
