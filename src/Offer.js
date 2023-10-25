import React, { useState, useEffect } from 'react';

function DataFetchingComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pozyczki24.online/json/apps/', {
          method: 'GET',
          // mode: 'no-cors', // Устанавливаем режим 'no-cors'
        });
        
        if (response.ok) {
          // Если ответ успешный, попробуйте получить данные
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Ошибка при получении данных');
        }
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Данные из JSON:</h1>
          <ul>
            {data.mfo.map(item => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>Возраст: {item.age}</p>
                <p>Статус: {item.status}</p>
                <img src={item.link} alt={item.name} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
}

export default DataFetchingComponent;
