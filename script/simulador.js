const rangeInput = document.getElementById('prazoMeses');
const valueDisplay = document.getElementById('prazoValor');

valueDisplay.textContent = `${rangeInput.value} meses`;

rangeInput.addEventListener('input', function() {
    valueDisplay.textContent = `${this.value} meses`;
});
