/**
 * Движок приложения «Подготовка к КТ — Магистратура IT»
 * Выполнен на чистом JavaScript (ES6)
 */

const TheoryData = {
    "Big O": {
        title: "Асимптотический анализ и Big O",
        content: `
            <p><strong>Big O (O-нотация)</strong> характеризует верхнюю границу временной или пространственной сложности алгоритма в наихудшем сценарии в зависимости от размера входных данных $n$.</p>
            <h5>Иерархия классов сложности:</h5>
            <ul>
                <li><code>O(1)</code> — Константная сложность (доступ к элементу массива по индексу).</li>
                <li><code>O(log n)</code> — Логарифмическая сложность (бинарный поиск).</li>
                <li><code>O(n)</code> — Линейная сложность (линейный поиск).</li>
                <li><code>O(n log n)</code> — Квазилинейная сложность (Merge Sort, Quick Sort в среднем).</li>
                <li><code>O(n²)</code> — Квадратичная сложность (Bubble Sort, вложенные циклы).</li>
            </ul>
            <h5>Псевдокод Бинарного Поиска O(log n):</h5>
            <pre><code>function binarySearch(arr, target):
    left = 0
    right = length(arr) - 1
    while left <= right:
        mid = left + (right - left) / 2
        if arr[mid] == target: return mid
        else if arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1</code></pre>
        `
    },
    "Arrays & Lists": {
        title: "Массивы и Связные списки",
        content: `
            <p><strong>Массив</strong> задействует непрерывный блок памяти, обеспечивая доступ за <code>O(1)</code>, но вставку в середину за <code>O(n)</code>.</p>
            <p><strong>Связный список (LinkedList)</strong> состоит из узлов с указателями. Вставка после известного узла занимает <code>O(1)</code>, но доступ по индексу — <code>O(n)</code>.</p>
        `
    },
    "SQL Joins": {
        title: "Реляционные соединения (JOIN)",
        content: `
            <p>Оператор <strong>JOIN</strong> объединяет записи из двух таблиц на основе ключевых полей:</p>
            <ul>
                <li><code>INNER JOIN</code> — возвращает только пересекающиеся строки.</li>
                <li><code>LEFT JOIN</code> — возвращает все строки из левой таблицы и совпадения из правой.</li>
                <li><code>FULL JOIN</code> — возвращает все записи обеих таблиц.</li>
            </ul>
            <h5>Пример SQL-запроса:</h5>
            <pre><code>SELECT u.username, o.amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id 
WHERE o.amount > 500;</code></pre>
        `
    },
    "ACID & Transactions": {
        title: "Транзакции и принципы ACID",
        content: `
            <p>Транзакция — это последовательность SQL-операций, выполняемая как единое целое.</p>
            <ul>
                <li><strong>Atomicity (Атомарность)</strong>: Выполняется всё или ничего.</li>
                <li><strong>Consistency (Согласованность)</strong>: Сохранение целостности данных.</li>
                <li><strong>Isolation (Изолированность)</strong>: Параллельные транзакции не мешают друг другу.</li>
                <li><strong>Durability (Долговечность)</strong>: Гарантия сохранения результат при сбоях.</li>
            </ul>
        `
    }
};

// Встроенный банк вопросов по умолчанию для гарантированной локальной работы без CORS
const BuiltInQuestions = [
    {
        id: 1,
        subject: "Algorithms",
        topic: "Big O",
        difficulty: "Medium",
        question: "Какова временная сложность бинарного поиска в отсортированном массиве размером n?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
        explanation: "Бинарный поиск на каждом шаге делит массив пополам, что дает логарифмическую сложность O(log n)."
    },
    {
        id: 2,
        subject: "Algorithms",
        topic: "Big O",
        difficulty: "Easy",
        question: "Какая операция в динамическом массиве выполняется за константное время O(1)?",
        options: ["Поиск элемента по значению", "Доступ к элементу по индексу", "Вставка в середину", "Удаление элемента из начала"],
        correct: 1,
        explanation: "Прямая адресация по индексу рассчитывается через базовый адрес за O(1)."
    },
    {
        id: 3,
        subject: "Algorithms",
        topic: "Sorting",
        difficulty: "Medium",
        question: "Какой алгоритм сортировки имеет гарантированное время работы O(n log n) даже в худшем случае?",
        options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Insertion Sort"],
        correct: 2,
        explanation: "Merge Sort делит массив строго пополам и сливает подмассивы за O(n log n) в любых сценариях."
    },
    {
        id: 4,
        subject: "Databases",
        topic: "SQL Joins",
        difficulty: "Medium",
        question: "Таблица A содержит 10 строк, Таблица B — 5 строк. Выполняется LEFT JOIN. Каково минимальное количество строк в ответе?",
        options: ["0", "5", "10", "50"],
        correct: 2,
        explanation: "LEFT JOIN сохраняет абсолютно все записи из левой таблицы (A), поэтому минимальное число строк — 10."
    },
    {
        id: 5,
        subject: "Databases",
        topic: "SQL",
        difficulty: "Easy",
        question: "В чем различие между операторами WHERE и HAVING в SQL?",
        options: [
            "WHERE фильтрует строки до группировки, HAVING — после группировки",
            "HAVING фильтрует строки до группировки, WHERE — после",
            "Они абсолютно идентичны",
            "HAVING используется только в подзапросах"
        ],
        correct: 0,
        explanation: "WHERE накладывает предикаты на отдельные строки таблицы до GROUP BY, а HAVING отсеивает результаты агрегации."
    },
    {
        id: 6,
        subject: "Databases",
        topic: "ACID",
        difficulty: "Hard",
        question: "Какое свойство ACID гарантирует, что при сбое питания завершенная транзакция не будет потеряна?",
        options: ["Atomicity", "Consistency", "Isolation", "Durability"],
        correct: 3,
        explanation: "Durability (Долговечность) отвечает за физическое сохранение зафиксированных результатов на диск."
    }
];

class App {
    constructor() {
        this.questions = [];
        this.currentExam = null;
        this.timerId = null;
        this.userErrors = JSON.parse(localStorage.getItem('kt_errors') || '[]');
        this.history = JSON.parse(localStorage.getItem('kt_history') || '[]');

        this.init();
    }

    async init() {
        // Попытка загрузить questions.json, при ошибке (CORS/file://) — берем встроенный массив
        try {
            const res = await fetch('questions.json');
            if (res.ok) {
                this.questions = await res.json();
            } else {
                this.questions = BuiltInQuestions;
            }
        } catch (e) {
            this.questions = BuiltInQuestions;
        }

        this.updateErrorBadge();
        this.renderTopicsList();
        this.renderHistory();
    }

    showView(viewName) {
        document.querySelectorAll('.app-view').forEach(el => el.classList.add('d-none'));
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));

        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) targetView.classList.remove('d-none');

        const navItem = document.getElementById(`nav-${viewName}`);
        if (navItem) navItem.classList.add('active');

        if (viewName === 'bank') this.filterBank();
        if (viewName === 'errors') this.renderErrorsList();
        if (viewName === 'stats') this.renderHistory();
    }

    // --- Управление Экзаменом ---
    startExam(count = 100, minutes = 120) {
        let pool = [...this.questions];
        // Если база меньше запрошенного количества, берем всю доступную базу
        pool = this.shuffleArray(pool).slice(0, Math.min(count, pool.length));

        this.currentExam = {
            questions: pool,
            answers: new Array(pool.length).fill(null),
            bookmarks: new Array(pool.length).fill(false),
            currentIndex: 0,
            durationSeconds: minutes * 60,
            elapsedSeconds: 0
        };

        this.showView('exam');
        this.renderCurrentQuestion();
        this.startTimer();
    }

    startSubjectQuiz(subject) {
        let pool = this.questions.filter(q => q.subject === subject);
        this.currentExam = {
            questions: this.shuffleArray(pool),
            answers: new Array(pool.length).fill(null),
            bookmarks: new Array(pool.length).fill(false),
            currentIndex: 0,
            durationSeconds: 60 * 60,
            elapsedSeconds: 0
        };
        this.showView('exam');
        this.renderCurrentQuestion();
        this.startTimer();
    }

    renderCurrentQuestion() {
        const exam = this.currentExam;
        const q = exam.questions[exam.currentIndex];

        document.getElementById('exam-progress-text').innerText = `Вопрос ${exam.currentIndex + 1} из ${exam.questions.length}`;
        document.getElementById('exam-topic-badge').innerText = `${q.subject} — ${q.topic}`;
        document.getElementById('exam-progress-bar').style.width = `${((exam.currentIndex + 1) / exam.questions.length) * 100}%`;

        document.getElementById('question-text').innerText = q.question;

        // Варианты ответов
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = `option-btn ${exam.answers[exam.currentIndex] === idx ? 'selected' : ''}`;
            btn.innerHTML = `<span class="fw-bold me-2">${String.fromCharCode(65 + idx)})</span> ${opt}`;
            btn.onclick = () => this.selectOption(idx);
            container.appendChild(btn);
        });

        // Закладки
        const bmBtn = document.getElementById('btn-bookmark');
        if (exam.bookmarks[exam.currentIndex]) {
            bmBtn.classList.replace('btn-outline-warning', 'btn-warning');
            document.getElementById('bookmark-text').innerText = 'Отмечен';
        } else {
            bmBtn.classList.replace('btn-warning', 'btn-outline-warning');
            document.getElementById('bookmark-text').innerText = 'Пометить';
        }

        // Состояние кнопок
        document.getElementById('btn-prev-q').disabled = exam.currentIndex === 0;
    }

    selectOption(index) {
        this.currentExam.answers[this.currentExam.currentIndex] = index;
        this.renderCurrentQuestion();
    }

    toggleBookmark() {
        const idx = this.currentExam.currentIndex;
        this.currentExam.bookmarks[idx] = !this.currentExam.bookmarks[idx];
        this.renderCurrentQuestion();
    }

    nextQuestion() {
        if (this.currentExam.currentIndex < this.currentExam.questions.length - 1) {
            this.currentExam.currentIndex++;
            this.renderCurrentQuestion();
        } else {
            this.finishExam();
        }
    }

    prevQuestion() {
        if (this.currentExam.currentIndex > 0) {
            this.currentExam.currentIndex--;
            this.renderCurrentQuestion();
        }
    }

    skipQuestion() {
        this.nextQuestion();
    }

    startTimer() {
        clearInterval(this.timerId);
        this.timerId = setInterval(() => {
            this.currentExam.elapsedSeconds++;
            const remain = this.currentExam.durationSeconds - this.currentExam.elapsedSeconds;
            if (remain <= 0) {
                this.finishExam();
                return;
            }
            const m = Math.floor(remain / 60).toString().padStart(2, '0');
            const s = (remain % 60).toString().padStart(2, '0');
            document.getElementById('exam-timer').innerText = `${m}:${s}`;
        }, 1000);
    }

    finishExam() {
        clearInterval(this.timerId);
        const exam = this.currentExam;
        let correctCount = 0;

        exam.questions.forEach((q, idx) => {
            if (exam.answers[idx] === q.correct) {
                correctCount++;
            } else {
                // Добавляем в список ошибок, избегая дубликатов
                if (!this.userErrors.some(e => e.id === q.id)) {
                    this.userErrors.push(q);
                }
            }
        });

        localStorage.setItem('kt_errors', JSON.stringify(this.userErrors));
        this.updateErrorBadge();

        const percent = Math.round((correctCount / exam.questions.length) * 100);
        const record = {
            date: new Date().toLocaleDateString('ru-RU'),
            mode: `Тест (${exam.questions.length} вопр.)`,
            score: `${correctCount}/${exam.questions.length}`,
            percent: percent,
            time: `${Math.floor(exam.elapsedSeconds / 60)} мин`
        };

        this.history.unshift(record);
        localStorage.setItem('kt_history', JSON.stringify(this.history));

        // Показ результатов
        document.getElementById('res-score').innerText = `${correctCount} / ${exam.questions.length}`;
        document.getElementById('res-percent').innerText = `${percent}%`;
        document.getElementById('res-time').innerText = `${Math.floor(exam.elapsedSeconds / 60)}м ${exam.elapsedSeconds % 60}с`;

        this.renderResultsBreakdown();
        this.showView('results');
    }

    renderResultsBreakdown() {
        const container = document.getElementById('results-breakdown-container');
        container.innerHTML = '';

        this.currentExam.questions.forEach((q, idx) => {
            const userAns = this.currentExam.answers[idx];
            const isCorrect = userAns === q.correct;

            const card = document.createElement('div');
            card.className = `card shadow-sm border-0 border-start border-5 ${isCorrect ? 'border-success' : 'border-danger'} p-3`;
            card.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'}">${isCorrect ? 'Верно' : 'Ошибка'}</span>
                    <span class="text-muted small">${q.subject} • ${q.topic}</span>
                </div>
                <h5 class="fw-bold text-dark">${idx + 1}. ${q.question}</h5>
                <div class="my-2">
                    ${q.options.map((opt, oIdx) => `
                        <div class="p-2 my-1 rounded border ${oIdx === q.correct ? 'bg-success-subtle border-success text-success fw-bold' : (oIdx === userAns ? 'bg-danger-subtle border-danger text-danger' : 'bg-light')}">
                            ${String.fromCharCode(65 + oIdx)}) ${opt}
                        </div>
                    `).join('')}
                </div>
                <div class="alert alert-info py-2 px-3 small mt-2 mb-0">
                    <strong>Объяснение:</strong> ${q.explanation}
                </div>
            `;
            container.appendChild(card);
        });
    }

    // --- Поиск и фильтр вопросов ---
    filterBank() {
        const text = document.getElementById('search-input').value.toLowerCase();
        const subj = document.getElementById('filter-subject').value;
        const diff = document.getElementById('filter-difficulty').value;

        const filtered = this.questions.filter(q => {
            const mText = q.question.toLowerCase().includes(text) || q.topic.toLowerCase().includes(text);
            const mSubj = subj === 'All' || q.subject === subj;
            const mDiff = diff === 'All' || q.difficulty === diff;
            return mText && mSubj && mDiff;
        });

        const container = document.getElementById('bank-questions-list');
        container.innerHTML = '';

        filtered.forEach(q => {
            const item = document.createElement('div');
            item.className = 'card shadow-sm border-0 p-3';
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle">${q.subject}</span>
                    <span class="badge bg-secondary">${q.difficulty}</span>
                </div>
                <h5 class="fw-bold text-dark">${q.question}</h5>
                <p class="text-muted small mb-2">Тема: ${q.topic}</p>
                <div class="alert alert-light border small text-secondary mb-0">
                    <strong>Ответ:</strong> ${q.options[q.correct]}<br>
                    <strong>Пояснение:</strong> ${q.explanation}
                </div>
            `;
            container.appendChild(item);
        });
    }

    resetFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('filter-subject').value = 'All';
        document.getElementById('filter-difficulty').value = 'All';
        this.filterBank();
    }

    // --- Обучение ---
    renderTopicsList() {
        const list = document.getElementById('topics-list');
        list.innerHTML = '';
        Object.keys(TheoryData).forEach((topicKey, index) => {
            const btn = document.createElement('button');
            btn.className = `list-group-item list-group-item-action ${index === 0 ? 'active' : ''}`;
            btn.innerText = topicKey;
            btn.onclick = () => {
                document.querySelectorAll('#topics-list .list-group-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadTheory(topicKey);
            };
            list.appendChild(btn);
        });
        if (Object.keys(TheoryData).length > 0) {
            this.loadTheory(Object.keys(TheoryData)[0]);
        }
    }

    loadTheory(topicKey) {
        const data = TheoryData[topicKey];
        if (!data) return;
        document.getElementById('theory-title').innerText = data.title;
        document.getElementById('theory-content').innerHTML = data.content;
        const btn = document.getElementById('btn-start-topic-quiz');
        btn.classList.remove('d-none');
        btn.dataset.topic = topicKey;
    }

    startTopicPractice() {
        const topicKey = document.getElementById('btn-start-topic-quiz').dataset.topic;
        let pool = this.questions.filter(q => q.topic.toLowerCase().includes(topicKey.toLowerCase()) || topicKey.toLowerCase().includes(q.topic.toLowerCase()));
        if (pool.length === 0) pool = this.questions;

        this.currentExam = {
            questions: this.shuffleArray(pool).slice(0, 20),
            answers: new Array(Math.min(20, pool.length)).fill(null),
            bookmarks: new Array(Math.min(20, pool.length)).fill(false),
            currentIndex: 0,
            durationSeconds: 30 * 60,
            elapsedSeconds: 0
        };
        this.showView('exam');
        this.renderCurrentQuestion();
        this.startTimer();
    }

    // --- Ошибки и Статистика ---
    updateErrorBadge() {
        document.getElementById('error-badge').innerText = this.userErrors.length;
    }

    renderErrorsList() {
        const container = document.getElementById('errors-list');
        container.innerHTML = '';
        if (this.userErrors.length === 0) {
            container.innerHTML = '<div class="alert alert-success">Список ошибок пуст! Вы успешно ответили на все вопросы.</div>';
            document.getElementById('btn-start-errors-quiz').disabled = true;
            return;
        }
        document.getElementById('btn-start-errors-quiz').disabled = false;

        this.userErrors.forEach(q => {
            const item = document.createElement('div');
            item.className = 'card shadow-sm border-0 p-3';
            item.innerHTML = `
                <h5 class="fw-bold text-dark">${q.question}</h5>
                <div class="text-muted small mb-2">${q.subject} • ${q.topic}</div>
                <div class="text-danger small">Правильный ответ: ${q.options[q.correct]}</div>
            `;
            container.appendChild(item);
        });
    }

    startErrorsQuiz() {
        if (this.userErrors.length === 0) return;
        this.currentExam = {
            questions: [...this.userErrors],
            answers: new Array(this.userErrors.length).fill(null),
            bookmarks: new Array(this.userErrors.length).fill(false),
            currentIndex: 0,
            durationSeconds: 45 * 60,
            elapsedSeconds: 0
        };
        this.showView('exam');
        this.renderCurrentQuestion();
        this.startTimer();
    }

    renderHistory() {
        document.getElementById('stat-total-tests').innerText = this.history.length;
        if (this.history.length > 0) {
            const best = Math.max(...this.history.map(h => h.percent));
            const avg = Math.round(this.history.reduce((a, b) => a + b.percent, 0) / this.history.length);
            document.getElementById('stat-best-score').innerText = `${best}%`;
            document.getElementById('stat-avg-score').innerText = `${avg}%`;
        }

        const tbody = document.getElementById('history-table-body');
        tbody.innerHTML = '';
        this.history.forEach(h => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${h.date}</td>
                <td>${h.mode}</td>
                <td>${h.score}</td>
                <td><span class="badge ${h.percent >= 70 ? 'bg-success' : 'bg-danger'}">${h.percent}%</span></td>
                <td>${h.time}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    shuffleArray(arr) {
        return [...arr].sort(() => Math.random() - 0.5);
    }
}

// Инициализация приложения
const app = new App();

