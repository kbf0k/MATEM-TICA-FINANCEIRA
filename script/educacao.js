function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function checkAnswers() {
    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'a'
    };
    
    let score = 0;
    const form = document.getElementById('quiz-form');
    const result = document.getElementById('result');
    
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const selectedAnswer = form.querySelector(`input[name=${question}]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            score++;
        }
    }
    
    result.textContent = `Você acertou ${score} de ${Object.keys(correctAnswers).length} perguntas.`;
}
function checkAnswers(formId, correctAnswers, resultId) {
    let score = 0;
    const form = document.getElementById(formId);
    const result = document.getElementById(resultId);
    
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const selectedAnswer = form.querySelector(`input[name=${question}]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswer) {
            score++;
        }
    }
    
    result.textContent = `Você acertou ${score} de ${Object.keys(correctAnswers).length} perguntas.`;
}

