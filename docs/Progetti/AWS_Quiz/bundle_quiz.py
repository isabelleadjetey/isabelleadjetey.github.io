import os
import json

base_dir = r"C:\Users\isabe\.gemini\antigravity\scratch\portfolio-repo\docs\Progetti\AWS_Quiz"

html_template = """<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWS Premium Quiz Engine</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Outfit', sans-serif;
        }

        body {
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
            padding: 20px;
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 900px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            position: relative;
            animation: fadeIn 0.8s ease-out;
            margin: auto;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 20px;
            background: -webkit-linear-gradient(#ff9900, #ffc107);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .quiz-selector {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .quiz-btn {
            background: rgba(255, 153, 0, 0.1);
            border: 1px solid #ff9900;
            color: white;
            padding: 20px;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }

        .quiz-btn:hover {
            background: rgba(255, 153, 0, 0.3);
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(255, 153, 0, 0.2);
        }

        .progress-container {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            margin-bottom: 30px;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #ff9900, #ff5e62);
            width: 0%;
            transition: width 0.4s ease;
            box-shadow: 0 0 10px #ff9900;
        }

        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .badge {
            background: rgba(255, 153, 0, 0.2);
            color: #ff9900;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid rgba(255, 153, 0, 0.4);
        }
        .question-text {
            font-size: 1.4rem;
            font-weight: 400;
            margin-bottom: 30px;
            line-height: 1.5;
        }

        .option-label {
            display: block;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 18px 20px;
            margin-bottom: 15px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
        }
        .option-label:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }
        .option-label input {
            margin-right: 15px;
            transform: scale(1.2);
            accent-color: #ff9900;
        }
        .option-label.selected {
            background: rgba(255, 153, 0, 0.2);
            border-color: #ff9900;
        }
        
        .btn-container {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }
        button.action-btn {
            background: linear-gradient(135deg, #ff9900, #ff8c00);
            color: #fff;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(255, 153, 0, 0.3);
        }
        button.action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 153, 0, 0.5);
        }
        button.action-btn:disabled {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.3);
            cursor: not-allowed;
            box-shadow: none;
        }

        .results-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 30px;
        }
        .result-card {
            background: rgba(0,0,0,0.2);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
        }
        .result-card h3 {
            font-size: 1rem;
            color: #aaa;
            margin-bottom: 10px;
        }
        .stat-ring {
            font-size: 2.5rem;
            font-weight: 800;
            color: #00ff88;
        }
        .verdict {
            grid-column: 1 / -1;
            padding: 20px;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: 800;
            text-align: center;
        }
        .verdict.pass {
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid #00ff88;
            color: #00ff88;
        }
        .verdict.fail {
            background: rgba(255, 94, 98, 0.1);
            border: 1px solid #ff5e62;
            color: #ff5e62;
        }
    </style>
</head>
<body>

<div class="glass-panel" id="setupPanel">
    <h1>AWS Premium Simulator</h1>
    <p style="text-align: center; color: #aaa; margin-bottom: 30px;">
        Esame Cloud Practitioner CLF-C02<br>
        <span style="font-size: 0.9em;">(Nessun file da caricare. Tutto già integrato!)</span>
    </p>

    <div class="quiz-selector">
        <div class="quiz-btn" onclick="startQuiz('quiz_1')">Simulazione Completa 1</div>
        <div class="quiz-btn" onclick="startQuiz('quiz_2')">Simulazione Completa 2</div>
        <div class="quiz-btn" onclick="startQuiz('quiz_3')">Simulazione Completa 3</div>
        <div class="quiz-btn" onclick="startQuiz('quiz_4')">Simulazione Completa 4</div>
        <div class="quiz-btn" onclick="startQuiz('quiz_5')">Simulazione Completa 5</div>
        <div class="quiz-btn" onclick="startQuiz('quiz_6')">Simulazione Completa 6</div>
    </div>
</div>

<div class="glass-panel" id="quizPanel" style="display: none;">
    <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
    </div>

    <div class="question-header">
        <span class="badge" id="domainBadge">Domain</span>
        <span class="badge" id="typeBadge">Type</span>
        <span style="color: #888; font-weight: 600;" id="qCounter">1 / 65</span>
    </div>

    <div class="question-text" id="questionText"></div>
    <div id="optionsContainer"></div>

    <div class="btn-container">
        <button id="prevBtn" class="action-btn" onclick="prevQuestion()" style="background: rgba(255,255,255,0.1); color: white; box-shadow: none;">⬅ Precedente</button>
        <button id="nextBtn" class="action-btn" onclick="nextQuestion()">Successiva ➡</button>
    </div>
</div>

<div class="glass-panel" id="resultsPanel" style="display: none;">
    <h1>Risultati Ufficiali</h1>
    
    <div id="verdictBox" class="verdict"></div>

    <div class="results-grid" id="statsGrid">
        <div class="result-card" style="grid-column: 1 / -1;">
            <h3>PUNTEGGIO TOTALE</h3>
            <div class="stat-ring" id="finalScore" style="color: #ff9900;">0%</div>
        </div>
    </div>
    
    <div style="text-align: center; margin-top: 40px;">
        <button class="action-btn" onclick="location.reload()">Torna al Menu Principale</button>
    </div>
</div>

<script>
    // INJECT DATA HERE
    const QUIZ_DATA = {__INJECT_DATA__};

    let questions = [];
    let currentIdx = 0;
    let userAnswers = {};

    function startQuiz(quizId) {
        questions = QUIZ_DATA[quizId];
        userAnswers = {};
        currentIdx = 0;
        document.getElementById('setupPanel').style.display = 'none';
        document.getElementById('quizPanel').style.display = 'block';
        showQuestion(0);
    }

    function showQuestion(index) {
        const q = questions[index];
        const isMulti = q.assessment_type === 'multi-select';
        
        document.getElementById('domainBadge').innerText = q.section;
        document.getElementById('typeBadge').innerText = isMulti ? "Scelta Multipla" : "Scelta Singola";
        document.getElementById('qCounter').innerText = `${index + 1} / ${questions.length}`;
        document.getElementById('progressBar').style.width = `${((index + 1) / questions.length) * 100}%`;
        
        document.getElementById('questionText').innerHTML = q.prompt.question;

        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const savedAns = userAnswers[index] || [];

        q.prompt.answers.forEach((ans, i) => {
            const letter = alphabet[i];
            const isChecked = savedAns.includes(letter);
            
            const label = document.createElement('label');
            label.className = `option-label ${isChecked ? 'selected' : ''}`;
            label.innerHTML = `
                <input type="${isMulti ? 'checkbox' : 'radio'}" name="option" value="${letter}" ${isChecked ? 'checked' : ''}>
                ${ans.replace(/<p>|<\/p>/g, '')}
            `;
            
            label.querySelector('input').addEventListener('change', () => {
                if(!isMulti) {
                    document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                    userAnswers[index] = [letter];
                } else {
                    if(userAnswers[index] === undefined) userAnswers[index] = [];
                    if(label.querySelector('input').checked) {
                        userAnswers[index].push(letter);
                    } else {
                        userAnswers[index] = userAnswers[index].filter(l => l !== letter);
                    }
                }
                label.classList.toggle('selected');
            });

            optionsContainer.appendChild(label);
        });

        document.getElementById('prevBtn').disabled = index === 0;
        
        const nextBtn = document.getElementById('nextBtn');
        if (index === questions.length - 1) {
            nextBtn.innerText = "Consegna Esame 🏁";
            nextBtn.onclick = finishExam;
        } else {
            nextBtn.innerText = "Successiva ➡";
            nextBtn.onclick = nextQuestion;
        }
    }

    function nextQuestion() {
        if (currentIdx < questions.length - 1) {
            currentIdx++;
            showQuestion(currentIdx);
        }
    }

    function prevQuestion() {
        if (currentIdx > 0) {
            currentIdx--;
            showQuestion(currentIdx);
        }
    }

    function finishExam() {
        document.getElementById('quizPanel').style.display = 'none';
        document.getElementById('resultsPanel').style.display = 'block';

        let correctCount = 0;
        let stats = {};

        questions.forEach((q, idx) => {
            const section = q.section || "Uncategorized";
            if (!stats[section]) stats[section] = { total: 0, correct: 0 };
            stats[section].total++;

            const correctArr = [...q.correct_response].sort();
            const userArr = (userAnswers[idx] || []).sort();

            if (JSON.stringify(correctArr) === JSON.stringify(userArr)) {
                correctCount++;
                stats[section].correct++;
            }
        });

        const totalPercent = Math.round((correctCount / questions.length) * 100);
        document.getElementById('finalScore').innerText = `${totalPercent}%`;
        
        const verdict = document.getElementById('verdictBox');
        if (totalPercent >= 70) {
            verdict.className = 'verdict pass';
            verdict.innerText = "🎉 ESAME SUPERATO! SEI PRONTA.";
            document.getElementById('finalScore').style.color = "#00ff88";
        } else {
            verdict.className = 'verdict fail';
            verdict.innerText = "⚠️ NON SUPERATO. RIPASSA E RIPROVA.";
            document.getElementById('finalScore').style.color = "#ff5e62";
        }

        const grid = document.getElementById('statsGrid');
        for (const [module, data] of Object.entries(stats)) {
            const p = Math.round((data.correct / data.total) * 100);
            const color = p >= 70 ? '#00ff88' : '#ff5e62';
            grid.innerHTML += `
                <div class="result-card">
                    <h3>${module.toUpperCase()}</h3>
                    <div class="stat-ring" style="color: ${color}; font-size: 2rem;">${p}%</div>
                    <div style="font-size: 0.8rem; color: #aaa; margin-top: 5px;">${data.correct} / ${data.total}</div>
                </div>
            `;
        }
    }
</script>

</body>
</html>
"""

quiz_data = {}
for i in range(1, 7):
    filename = f"quiz_{i}.json"
    filepath = os.path.join(base_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            quiz_data[f"quiz_{i}"] = data["results"]

json_string = json.dumps(quiz_data)
final_html = html_template.replace("{__INJECT_DATA__}", json_string)

output_path = os.path.join(base_dir, "AWS_Quiz_Engine.html")
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Quiz Engine bundled successfully!")
