let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptions = []; // Changed from selectedOption
let isAnswered = false;

const selectorScreen = document.getElementById('selector-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const progressBar = document.getElementById('progress-bar');
const questionNumber = document.getElementById('question-number');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const explanationBox = document.getElementById('explanation-box');
const explanationContent = document.getElementById('explanation-content');
const btnNext = document.getElementById('btn-next');
const btnExplanation = document.getElementById('btn-explanation');

async function startQuiz(quizNum) {
    selectorScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    questionText.innerHTML = '<div style="text-align:center">Caricamento quiz...</div>';
    
    try {
        const response = await fetch(`docs/Progetti/AWS/quiz_${quizNum}.json`);
        const data = await response.json();
        currentQuiz = data.results;
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
    } catch (error) {
        console.error("Error loading quiz:", error);
        questionText.innerHTML = "Errore nel caricamento del quiz. Assicurati che i file JSON siano presenti in docs/Progetti/AWS/";
    }
}

function showQuestion() {
    isAnswered = false;
    selectedOptions = [];
    explanationBox.style.display = 'none';
    btnExplanation.classList.add('hidden');
    btnNext.innerText = "Verifica Risposta";
    
    const q = currentQuiz[currentQuestionIndex];
    
    // Update progress
    const progress = ((currentQuestionIndex) / currentQuiz.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionNumber.innerText = `Domanda ${currentQuestionIndex + 1} di ${currentQuiz.length}`;
    questionCategory.innerText = (q.section || "General") + (q.assessment_type === 'multi-select' ? ' (Multi-Select)' : '');
    
    questionText.innerHTML = q.question_plain || q.prompt.question;
    
    optionsList.innerHTML = '';
    q.prompt.answers.forEach((answerHtml, index) => {
        const letter = String.fromCharCode(97 + index); // a, b, c, d...
        const div = document.createElement('div');
        div.className = 'option-item';
        div.innerHTML = `
            <div class="option-letter">${letter.toUpperCase()}</div>
            <div class="option-content">${answerHtml}</div>
        `;
        div.onclick = () => selectOption(letter, div);
        optionsList.appendChild(div);
    });
}

function selectOption(letter, element) {
    if (isAnswered) return;
    
    const q = currentQuiz[currentQuestionIndex];
    const isMulti = q.assessment_type === 'multi-select';
    
    if (isMulti) {
        if (selectedOptions.includes(letter)) {
            selectedOptions = selectedOptions.filter(l => l !== letter);
            element.classList.remove('selected');
        } else {
            selectedOptions.push(letter);
            element.classList.add('selected');
        }
    } else {
        // Single select
        document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        selectedOptions = [letter];
        element.classList.add('selected');
    }
}

function handleNext() {
    if (!isAnswered) {
        if (selectedOptions.length === 0) {
            alert("Per favore, seleziona almeno una risposta!");
            return;
        }
        checkAnswer();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
}

function checkAnswer() {
    isAnswered = true;
    const q = currentQuiz[currentQuestionIndex];
    const correctAnswers = q.correct_response; // Array like ["a"] or ["d", "e"]
    
    const optionElements = document.querySelectorAll('.option-item');
    
    // Sort both to compare arrays for exact match, or just check if all correct are selected
    let isCorrect = correctAnswers.length === selectedOptions.length && 
                    correctAnswers.every(val => selectedOptions.includes(val));
    
    optionElements.forEach((el, index) => {
        const letter = String.fromCharCode(97 + index);
        if (correctAnswers.includes(letter)) {
            el.classList.add('correct');
        } else if (selectedOptions.includes(letter)) {
            el.classList.add('wrong');
        }
    });

    if (isCorrect) {
        score++;
    }

    // Show explanation
    explanationContent.innerHTML = q.prompt.explanation;
    explanationBox.style.display = 'block';
    btnExplanation.classList.remove('hidden');
    
    btnNext.innerText = currentQuestionIndex + 1 < currentQuiz.length ? "Prossima Domanda" : "Visualizza Risultati";
}

function toggleExplanation() {
    if (explanationBox.style.display === 'none') {
        explanationBox.style.display = 'block';
        btnExplanation.innerText = "Nascondi Spiegazione";
    } else {
        explanationBox.style.display = 'none';
        btnExplanation.innerText = "Mostra Spiegazione";
    }
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const percentage = Math.round((score / currentQuiz.length) * 100);
    document.getElementById('final-score').innerText = percentage;
    document.getElementById('score-text').innerText = `Hai risposto correttamente a ${score} domande su ${currentQuiz.length}.`;
}

function resetQuiz() {
    resultScreen.classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    quizScreen.classList.remove('hidden');
}

function showSelector() {
    resultScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    selectorScreen.classList.remove('hidden');
}

// Support for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (quizScreen.classList.contains('hidden')) return;
    
    if (e.key === '1' || e.key === 'a') selectByLetter('a');
    if (e.key === '2' || e.key === 'b') selectByLetter('b');
    if (e.key === '3' || e.key === 'c') selectByLetter('c');
    if (e.key === '4' || e.key === 'd') selectByLetter('d');
    if (e.key === 'Enter') handleNext();
});

function selectByLetter(letter) {
    const options = document.querySelectorAll('.option-item');
    const index = letter.charCodeAt(0) - 97;
    if (options[index]) {
        selectOption(letter, options[index]);
    }
}
