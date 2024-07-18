const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonValue = button.dataset.value;


    if (buttonValue === "=") {
      // Send calculation request to backend
      calculate(display.value)
        .then(result => {
          display.value = result;
        })
        .catch(error => {
          display.value = "Error";
          console.error('Error calculating:', error);
        });

    } else if (buttonValue === "AC") {
      display.value = "";

    } else if (buttonValue === "DE") {
      display.value = display.value.slice(0, -1);
    } else
     {
      display.value += buttonValue;
    }
  });
});


async function calculate(expression) {
  try {
    const response = await fetch('http://localhost:3000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expression })
    });


    if (!response.ok) {
      throw new Error('Failed to calculate');
    }


    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
  
}
