// Diagnostic Assessment JavaScript for REBWB

// Quick Investor Profile Questions
const quickQuestions = [
    {
        q: "How would you describe your real estate investment experience?",
        options: ["Beginner (0-2 properties)", "Intermediate (3-10 properties)", "Advanced (10+ properties)"],
        weights: { conservative: [3, 2, 1], growth: [1, 2, 3], value: [2, 2, 2], cashflow: [2, 2, 2], portfolio: [1, 2, 3] }
    },
    {
        q: "What's your primary investment goal?",
        options: ["Steady cash flow", "Long-term appreciation", "Tax benefits", "Portfolio diversification"],
        weights: { conservative: [3, 1, 2, 1], growth: [1, 3, 1, 2], value: [2, 2, 1, 1], cashflow: [3, 1, 2, 1], portfolio: [1, 2, 2, 3] }
    },
    {
        q: "How much capital do you have available for investment?",
        options: ["Under $50k", "$50k-$150k", "$150k-$500k", "Over $500k"],
        weights: { conservative: [3, 2, 1, 1], growth: [1, 2, 3, 3], value: [2, 3, 2, 1], cashflow: [2, 2, 2, 2], portfolio: [1, 2, 2, 3] }
    },
    {
        q: "What's your risk tolerance?",
        options: ["Conservative (safety first)", "Moderate (balanced approach)", "Aggressive (higher returns worth risk)"],
        weights: { conservative: [3, 2, 1], growth: [1, 2, 3], value: [2, 3, 1], cashflow: [3, 2, 1], portfolio: [2, 2, 2] }
    },
    {
        q: "How much time can you dedicate to real estate weekly?",
        options: ["Under 5 hours", "5-15 hours", "15+ hours (full-time)"],
        weights: { conservative: [3, 2, 1], growth: [1, 2, 3], value: [2, 2, 2], cashflow: [2, 3, 2], portfolio: [1, 2, 3] }
    },
    {
        q: "What type of property interests you most?",
        options: ["Single-family homes", "Small multifamily (2-4 units)", "Large multifamily (5+ units)", "Commercial"],
        weights: { conservative: [3, 2, 1, 1], growth: [2, 2, 2, 2], value: [2, 3, 2, 1], cashflow: [2, 3, 2, 1], portfolio: [1, 2, 2, 3] }
    },
    {
        q: "What's your investment time horizon?",
        options: ["Short-term (1-3 years)", "Medium-term (3-7 years)", "Long-term (7+ years)"],
        weights: { conservative: [1, 2, 3], growth: [1, 2, 3], value: [2, 3, 1], cashflow: [2, 2, 3], portfolio: [1, 2, 3] }
    },
    {
        q: "How do you prefer to manage properties?",
        options: ["Hire property manager", "Self-manage", "Hybrid approach"],
        weights: { conservative: [3, 1, 2], growth: [2, 2, 2], value: [1, 3, 2], cashflow: [1, 2, 3], portfolio: [2, 1, 2] }
    },
    {
        q: "What's your current employment situation?",
        options: ["Full-time W2 job", "Self-employed", "Part-time work", "Retired/financially independent"],
        weights: { conservative: [3, 2, 2, 1], growth: [2, 3, 2, 2], value: [2, 2, 2, 2], cashflow: [2, 2, 2, 3], portfolio: [2, 2, 2, 3] }
    },
    {
        q: "What's your credit score range?",
        options: ["Below 620", "620-680", "680-740", "Above 740"],
        weights: { conservative: [1, 2, 3, 3], growth: [1, 2, 2, 3], value: [2, 2, 2, 2], cashflow: [2, 2, 3, 3], portfolio: [1, 2, 3, 3] }
    },
    {
        q: "How important is passive income vs. active involvement?",
        options: ["Want fully passive", "Prefer mostly passive", "Don't mind active involvement", "Prefer hands-on"],
        weights: { conservative: [3, 3, 1, 1], growth: [2, 2, 2, 2], value: [1, 2, 3, 2], cashflow: [3, 3, 2, 1], portfolio: [2, 2, 2, 2] }
    },
    {
        q: "What's your biggest concern about real estate investing?",
        options: ["Losing money", "Time commitment", "Tenant problems", "Market volatility"],
        weights: { conservative: [3, 2, 2, 3], growth: [1, 2, 2, 3], value: [2, 2, 3, 1], cashflow: [2, 2, 3, 2], portfolio: [1, 1, 2, 3] }
    }
];

// Profile Results
const profiles = {
    conservative: {
        title: "Conservative Builder",
        description: "You prioritize safety and stability. You're best suited for established markets with proven track records, focusing on properties with solid fundamentals and reliable cash flow.",
        recommendations: [
            "Start with single-family homes in stable neighborhoods",
            "Focus on properties with positive cash flow from day one",
            "Build a strong financial foundation before scaling",
            "Consider turnkey properties or light value-add opportunities"
        ],
        modules: [1, 2, 3, 6, 10]
    },
    growth: {
        title: "Growth Seeker",
        description: "You're willing to take calculated risks for higher returns. You understand that appreciation and strategic positioning can build significant wealth over time.",
        recommendations: [
            "Look for emerging markets with strong fundamentals",
            "Consider value-add opportunities for forced appreciation",
            "Balance growth plays with some stable cash flow properties",
            "Focus on markets with job growth and population increases"
        ],
        modules: [2, 4, 5, 7, 13]
    },
    value: {
        title: "Value Hunter",
        description: "You excel at finding undervalued opportunities and adding value through improvements. You're hands-on and willing to do the work to unlock hidden potential.",
        recommendations: [
            "Develop skills in property renovation and improvement",
            "Build a reliable contractor network",
            "Focus on distressed properties with clear value-add paths",
            "Create systems for analyzing renovation costs accurately"
        ],
        modules: [4, 5, 12, 13, 14]
    },
    cashflow: {
        title: "Cash Flow Focused",
        description: "Your priority is generating immediate income. You want properties that pay you monthly and provide financial freedom through consistent cash flow.",
        recommendations: [
            "Target properties with strong rent-to-price ratios",
            "Consider small multifamily for better cash flow",
            "Master tenant screening to ensure reliable rent payments",
            "Build reserves for maintenance while maximizing NOI"
        ],
        modules: [2, 3, 9, 10, 11]
    },
    portfolio: {
        title: "Portfolio Optimizer",
        description: "You think strategically about building a diversified, scalable portfolio. You understand systems, leverage, and long-term wealth building.",
        recommendations: [
            "Develop scalable systems and processes early",
            "Consider hiring property management as you scale",
            "Focus on markets where you can buy multiple properties",
            "Build strong financial infrastructure and team"
        ],
        modules: [6, 7, 8, 9, 10]
    }
};

let currentQuestion = 0;
let answers = [];

function startQuickDiagnostic() {
    currentQuestion = 0;
    answers = [];
    showQuizModal();
}

function showQuizModal() {
    const modal = document.createElement('div');
    modal.id = 'quizModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 class="text-2xl font-bold">Quick Investor Profile</h3>
                <button onclick="closeQuizModal()" class="text-gray-400 hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div id="quizContent" class="p-6">
                ${renderQuestion()}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeQuizModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.remove();
    }
}

function renderQuestion() {
    const question = quickQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quickQuestions.length) * 100;
    
    return `
        <div class="mb-6">
            <div class="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question ${currentQuestion + 1} of ${quickQuestions.length}</span>
                <span>${Math.round(progress)}% Complete</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${progress}%"></div>
            </div>
        </div>
        
        <h4 class="text-xl font-semibold mb-6">${question.q}</h4>
        
        <div class="space-y-3">
            ${question.options.map((opt, idx) => `
                <button onclick="selectAnswer(${idx})" 
                        class="w-full text-left p-4 bg-gray-900 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-lg transition">
                    ${opt}
                </button>
            `).join('')}
        </div>
    `;
}

function selectAnswer(answerIndex) {
    answers.push(answerIndex);
    currentQuestion++;
    
    if (currentQuestion < quickQuestions.length) {
        document.getElementById('quizContent').innerHTML = renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Calculate scores for each profile
    const scores = {
        conservative: 0,
        growth: 0,
        value: 0,
        cashflow: 0,
        portfolio: 0
    };
    
    answers.forEach((answer, qIndex) => {
        const question = quickQuestions[qIndex];
        Object.keys(scores).forEach(profile => {
            scores[profile] += question.weights[profile][answer];
        });
    });
    
    // Find the highest scoring profile
    let topProfile = 'conservative';
    let topScore = scores.conservative;
    Object.keys(scores).forEach(profile => {
        if (scores[profile] > topScore) {
            topScore = scores[profile];
            topProfile = profile;
        }
    });
    
    const result = profiles[topProfile];
    
    document.getElementById('quizContent').innerHTML = `
        <div class="text-center mb-8">
            <div class="inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                Your Profile
            </div>
            <h3 class="text-3xl font-bold mb-4">${result.title}</h3>
            <p class="text-gray-300 text-lg">${result.description}</p>
        </div>
        
        <div class="bg-gray-900 rounded-lg p-6 mb-6">
            <h4 class="font-semibold text-xl mb-4">Recommended Next Steps:</h4>
            <ul class="space-y-3">
                ${result.recommendations.map(rec => `
                    <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>${rec}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="bg-blue-900 bg-opacity-30 rounded-lg p-6 mb-6">
            <h4 class="font-semibold text-lg mb-2">Recommended Course Modules:</h4>
            <p class="text-gray-300">Focus on modules ${result.modules.join(', ')} to get started with your investor profile.</p>
        </div>
        
        <div class="flex gap-4">
            <button onclick="closeQuizModal()" 
                    class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition">
                Close
            </button>
            <a href="course.html" 
               class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition text-center">
                View Course
            </a>
        </div>
    `;
}

function startPremiumDiagnostic() {
    const modal = document.createElement('div');
    modal.id = 'premiumModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 class="text-2xl font-bold">Comprehensive Portfolio Assessment</h3>
                <button onclick="closePremiumModal()" class="text-gray-400 hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="p-8">
                <div class="text-center mb-8">
                    <div class="text-4xl font-bold text-purple-400 mb-4">$47</div>
                    <p class="text-gray-300 text-lg">Get your complete portfolio analysis with actionable insights</p>
                </div>
                
                <div class="bg-gray-900 rounded-lg p-6 mb-8">
                    <h4 class="font-semibold text-xl mb-4">What You'll Get:</h4>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                            <div>
                                <p class="font-semibold">7-Dimension Analysis</p>
                                <p class="text-sm text-gray-400">Financial, Operational, Strategic, Risk, Market, Team, Systems</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                            <div>
                                <p class="font-semibold">Visual Charts</p>
                                <p class="text-sm text-gray-400">Radar chart showing strengths/weaknesses</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            <div>
                                <p class="font-semibold">PDF Report</p>
                                <p class="text-sm text-gray-400">Downloadable advisory report</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <div>
                                <p class="font-semibold">Action Plans</p>
                                <p class="text-sm text-gray-400">30/90/365-day roadmap</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-6 mb-8">
                    <p class="text-center font-semibold text-purple-300 text-lg">
                        ✓ Included FREE with course purchase
                    </p>
                </div>
                
                <div class="flex gap-4">
                    <button onclick="closePremiumModal()" 
                            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition">
                        Close
                    </button>
                    <a href="index.html#pricing" 
                       class="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition text-center">
                        Get Full Access
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closePremiumModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.remove();
    }
}

// Cliff Notes Form Submission
function submitCliffNotes(event) {
    event.preventDefault();
    
    const name = document.getElementById('cn-name').value;
    const email = document.getElementById('cn-email').value;
    
    // In production, this would send to your email service
    console.log('Cliff Notes signup:', { name, email });
    
    // Hide form, show success message
    document.getElementById('cliffNotesForm').classList.add('hidden');
    document.getElementById('cliffNotesSuccess').classList.remove('hidden');
    
    // Optional: Actually send the data to a backend
    // fetch('/api/cliff-notes-signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email })
    // });
}
