document.addEventListener('DOMContentLoaded', () => {
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');
  const amountInput = document.getElementById('amount');
  const convertButton = document.getElementById('convertButton');
  const resultElement = document.getElementById('result');

  // Fetch and populate currency options
  fetch('https://v6.exchangerate-api.com/v6/fc7466ec1940a54f5a4fc30a/latest/USD')
    .then(response => response.json())
    .then(data => {
      const currencies = Object.keys(data.conversion_rates);

      currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrencySelect.appendChild(option2);
      });
    });

  // Add event listener for the convert button
  convertButton.addEventListener('click', () => {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    fetch('https://v6.exchangerate-api.com/v6/fc7466ec1940a54f5a4fc30a/latest/USD')
      .then(response => response.json())
      .then(data => {
        const conversionRates = data.conversion_rates;

        if (!(fromCurrency in conversionRates) || !(toCurrency in conversionRates)) {
          alert('Selected currencies are not available for conversion.');
          return;
        }

        const conversionRate = conversionRates[toCurrency] / conversionRates[fromCurrency];
        const convertedAmount = amount * conversionRate;

        resultElement.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
});
