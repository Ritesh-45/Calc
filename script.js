let fieldCount = 0;

const cardContainer = document.getElementById("field_container");
const addButton = document.getElementById("add_btn");
function createCard() {
    fieldCount++;

    // Create card div
    const entry = document.createElement("div");
    entry.classList.add("entry");

    // Add inputs inside
    entry.innerHTML = `
        <div class="up">
            <label>Subject ${fieldCount}</label>
        </div>
        <div class="down">
            <label>Marks</label>
            <input type="text" id="marks_${fieldCount}">
            <p></p>
            <label>Credits</label>
            <input type="text" id="credit_${fieldCount}">
        </div>
    `;

    // Add to the container
    cardContainer.appendChild(entry);
}
createCard();
createCard();
createCard();
createCard();

	// When user clicks Add Subject
addButton.addEventListener("click", function () {
    createCard();
});

function calculate_GPA() {
    let totalCredits = 0;
    let weightedSum = 0;

    for (let i = 1; i <= fieldCount; i++) {
        let credit = parseFloat(document.getElementById(`credit_${i}`).value) || 0;
        let marks = parseFloat(document.getElementById(`marks_${i}`).value) || 0;
        
        let gradePoint = convertMarksToGPA(marks);
        
        totalCredits += credit;
        weightedSum += credit * gradePoint;
    }

    let gpa = totalCredits === 0 ? 0 : (weightedSum / totalCredits);
    
    const para = document.getElementById("para");
    para.textContent = `Your CGPA is ${gpa.toFixed(2)}`;
}

function convertMarksToGPA(marks) {
    if (marks >= 90) return 10.0;
    if (marks >= 80) return 9.0;
    if (marks >= 70) return 8.0;
    if (marks >= 60) return 7.0;
    if (marks >= 50) return 6.0;
    if (marks >= 40) return 5.0;
    return 0.0;
}

const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const suggestions = document.getElementById('suggestions');
const resultsContainer = document.getElementById('resultsContainer');
const loadingIndicator = document.getElementById('loading');
let allSubjects = [];

// Load data from spreadsheet
async function loadSpreadsheetData() {
    loadingIndicator.style.display = 'block';
    
    try {
        const response = await fetch('subjects.xlsx'); // Path to your spreadsheet in root folder
        if (!response.ok) throw new Error('Failed to load spreadsheet');
        
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        if (workbook.SheetNames.length === 0) {
            throw new Error('No sheets found in spreadsheet');
        }
        
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        allSubjects = jsonData
            .map(subject => {
                const name = subject["Subject Name"] || subject["subject"] || subject["name"];
                const credit = subject["Credit"] || subject["credit"];
                return name && credit ? { name, credit } : null;
            })
            .filter(Boolean);
        
        console.log('Loaded subjects:', allSubjects);
    } catch (error) {
        console.error('Error loading spreadsheet:', error);
        resultsContainer.innerHTML = `<div style="color: red;">Error loading subjects data: ${error.message}</div>`;
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

// Show suggestions based on input
function showSuggestions(input) {
    suggestions.innerHTML = '';
    
    if (input.length < 1 || allSubjects.length === 0) {
        suggestions.style.display = 'none';
        return;
    }

    const filtered = allSubjects.filter(subject =>
    subject.name && subject.name.toLowerCase().includes(input.toLowerCase())
    );

    if (filtered.length === 0) {
        suggestions.style.display = 'none';
        return;
    }

    filtered.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = subject.name;
        div.onclick = () => {
            searchBox.value = subject.name;
            addResult(subject);
            searchBox.value = '';
            suggestions.style.display = 'none';
        };
        suggestions.appendChild(div);
    });

    suggestions.style.display = 'block';
}

// Add a result to the results container
function addResult(subject) {
    const existingResult = document.getElementById(`result-${subject.name.replace(/\s+/g, '-')}`);
    if (existingResult) return;

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-item';
    resultDiv.id = `result-${subject.name.replace(/\s+/g, '-')}`;
    resultDiv.textContent = `${subject.name} - ${subject.credit} Credits`;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove_btn';
    removeBtn.textContent = 'X';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => resultDiv.remove();
    
    resultDiv.appendChild(removeBtn);
    resultsContainer.appendChild(resultDiv);
}

// Perform search when button is clicked
function performSearch() {
    const searchValue = searchBox.value.trim();
    if (!searchValue) return;

    const matchedSubject = allSubjects.find(subject =>
        subject.name.toLowerCase() === searchValue.toLowerCase()
    );
    
    if (matchedSubject) {
        addResult(matchedSubject);
        searchBox.value = '';
        suggestions.style.display = 'none';
    }
}

// Initialize when page loads
window.onload = function() {
    loadSpreadsheetData();
    
    searchBox.addEventListener('input', function() {
        showSuggestions(this.value);
    });

    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchButton.addEventListener('click', performSearch);

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.id !== 'searchBox' && e.target.id !== 'searchButton') {
            suggestions.style.display = 'none';
        }
    });
};