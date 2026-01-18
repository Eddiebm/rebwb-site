// Calculator functions for REBWB Tools

// Cash Flow Calculator
function calculateCashFlow() {
    const rent = getInputValue('cf-rent');
    const mortgage = getInputValue('cf-mortgage');
    const tax = getInputValue('cf-tax');
    const insurance = getInputValue('cf-insurance');
    const maintenance = getInputValue('cf-maintenance');
    const other = getInputValue('cf-other');
    
    const totalExpenses = mortgage + tax + insurance + maintenance + other;
    const monthlyCashFlow = rent - totalExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    setTextContent('cf-income', formatCurrency(rent));
    setTextContent('cf-expenses', formatCurrency(totalExpenses));
    setTextContent('cf-result', formatCurrency(monthlyCashFlow));
    setTextContent('cf-annual', formatCurrency(annualCashFlow));
    
    setResultColor('cf-result', monthlyCashFlow);
    setResultColor('cf-annual', annualCashFlow);
}

// ROI Calculator
function calculateROI() {
    const price = getInputValue('roi-price');
    const downPercent = getInputValue('roi-down');
    const closing = getInputValue('roi-closing');
    const reno = getInputValue('roi-reno');
    const income = getInputValue('roi-income');
    
    const downPayment = price * (downPercent / 100);
    const totalInvestment = downPayment + closing + reno;
    const roi = totalInvestment > 0 ? (income / totalInvestment) * 100 : 0;
    
    setTextContent('roi-investment', formatCurrency(totalInvestment));
    setTextContent('roi-net', formatCurrency(income));
    setTextContent('roi-result', formatPercentage(roi));
}

// Mortgage Calculator
function calculateMortgage() {
    const amount = getInputValue('mort-amount');
    const rate = getInputValue('mort-rate') / 100 / 12;
    const years = getInputValue('mort-years');
    const payments = years * 12;
    
    let monthlyPayment = 0;
    if (rate > 0) {
        monthlyPayment = amount * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    } else {
        monthlyPayment = amount / payments;
    }
    
    const totalPaid = monthlyPayment * payments;
    const totalInterest = totalPaid - amount;
    
    setTextContent('mort-payment', formatCurrency(monthlyPayment));
    setTextContent('mort-total', formatCurrency(totalPaid));
    setTextContent('mort-interest', formatCurrency(totalInterest));
}

// Cap Rate Calculator
function calculateCapRate() {
    const price = getInputValue('cap-price');
    const income = getInputValue('cap-income');
    const expenses = getInputValue('cap-expenses');
    
    const noi = income - expenses;
    const capRate = price > 0 ? (noi / price) * 100 : 0;
    
    setTextContent('cap-noi', formatCurrency(noi));
    setTextContent('cap-result', formatPercentage(capRate));
}

// Rent vs Buy Calculator
function calculateRentVsBuy() {
    const monthlyRent = getInputValue('rvb-rent');
    const homePrice = getInputValue('rvb-price');
    const downPercent = getInputValue('rvb-down');
    const rate = getInputValue('rvb-rate') / 100 / 12;
    const years = getInputValue('rvb-years');
    
    // Calculate total renting cost
    const totalRentCost = monthlyRent * years * 12;
    
    // Calculate mortgage payment
    const downPayment = homePrice * (downPercent / 100);
    const loanAmount = homePrice - downPayment;
    const payments = years * 12;
    
    let monthlyPayment = 0;
    if (rate > 0) {
        monthlyPayment = loanAmount * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
    } else {
        monthlyPayment = loanAmount / payments;
    }
    
    // Estimate property tax, insurance, maintenance (roughly 1.5% of home value per year)
    const annualHomeExpenses = homePrice * 0.015;
    const monthlyHomeExpenses = annualHomeExpenses / 12;
    
    // Total buying cost (down payment + mortgage payments + expenses)
    const totalBuyCost = downPayment + (monthlyPayment + monthlyHomeExpenses) * payments;
    
    // Calculate difference
    const difference = totalRentCost - totalBuyCost;
    
    setTextContent('rvb-rent-total', formatCurrency(totalRentCost));
    setTextContent('rvb-buy-total', formatCurrency(totalBuyCost));
    setTextContent('rvb-diff', formatCurrency(Math.abs(difference)));
    
    const resultElement = document.getElementById('rvb-diff');
    if (resultElement) {
        if (difference > 0) {
            resultElement.classList.remove('text-red-400');
            resultElement.classList.add('text-green-400');
        } else {
            resultElement.classList.remove('text-green-400');
            resultElement.classList.add('text-red-400');
        }
    }
    
    const recommendation = document.getElementById('rvb-recommendation');
    if (recommendation) {
        if (difference > 0) {
            recommendation.innerHTML = '<span class="text-green-400 font-semibold">Buying saves you ' + formatCurrency(difference) + '</span> over ' + years + ' years compared to renting.';
        } else {
            recommendation.innerHTML = '<span class="text-red-400 font-semibold">Renting saves you ' + formatCurrency(Math.abs(difference)) + '</span> over ' + years + ' years compared to buying.';
        }
        recommendation.classList.remove('text-gray-400');
    }
}

// Vacancy Rate Calculator
function calculateVacancy() {
    const monthlyRent = getInputValue('vac-rent');
    const vacancyRate = getInputValue('vac-rate');
    const daysVacant = getInputValue('vac-days');
    
    const annualRent = monthlyRent * 12;
    const vacancyLoss = annualRent * (vacancyRate / 100);
    
    // Estimate turnover cost based on days vacant
    const dailyRent = monthlyRent / 30;
    const turnoverCost = dailyRent * daysVacant;
    
    const effectiveIncome = annualRent - vacancyLoss;
    
    setTextContent('vac-loss', formatCurrency(vacancyLoss));
    setTextContent('vac-turnover', formatCurrency(turnoverCost));
    setTextContent('vac-effective', formatCurrency(effectiveIncome));
}

// 50% Rule Calculator
function calculate50Rule() {
    const rent = getInputValue('rule50-rent');
    const mortgage = getInputValue('rule50-mortgage');
    
    const estimatedExpenses = rent * 0.5;
    const cashFlow = rent - estimatedExpenses - mortgage;
    
    setTextContent('rule50-gross', formatCurrency(rent));
    setTextContent('rule50-expenses', formatCurrency(estimatedExpenses));
    setTextContent('rule50-mort', formatCurrency(mortgage));
    setTextContent('rule50-result', formatCurrency(cashFlow));
    
    setResultColor('rule50-result', cashFlow);
}

// 1% Rule Calculator
function calculate1Rule() {
    const price = getInputValue('rule1-price');
    const rent = getInputValue('rule1-rent');
    
    const percentage = price > 0 ? (rent / price) * 100 : 0;
    const meetsRule = percentage >= 1;
    
    setTextContent('rule1-price-display', formatCurrency(price));
    setTextContent('rule1-rent-display', formatCurrency(rent));
    setTextContent('rule1-percentage', formatPercentage(percentage));
    
    const resultBox = document.getElementById('rule1-result-box');
    const resultText = document.getElementById('rule1-result');
    
    if (resultBox && resultText) {
        if (meetsRule) {
            resultBox.className = 'mt-4 p-3 rounded bg-green-900 border border-green-700';
            resultText.innerHTML = '<span class="text-green-400 font-semibold">✓ Passes the 1% Rule</span><br><span class="text-sm text-gray-300">This property meets the basic screening criteria. Perform detailed analysis.</span>';
        } else {
            resultBox.className = 'mt-4 p-3 rounded bg-red-900 border border-red-700';
            resultText.innerHTML = '<span class="text-red-400 font-semibold">✗ Does not pass the 1% Rule</span><br><span class="text-sm text-gray-300">This property may not generate sufficient cash flow. Consider looking elsewhere.</span>';
        }
    }
}

// Initialize calculators on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add enter key listeners for all calculator inputs
    const calculatorInputs = document.querySelectorAll('input[id^="cf-"], input[id^="roi-"], input[id^="mort-"], input[id^="cap-"], input[id^="rvb-"], input[id^="vac-"], input[id^="rule50-"], input[id^="rule1-"]');
    
    calculatorInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Find the calculate button in the same parent section
                const section = this.closest('.bg-gray-800');
                const button = section ? section.querySelector('button[onclick^="calculate"]') : null;
                if (button) {
                    button.click();
                }
            }
        });
    });
});
