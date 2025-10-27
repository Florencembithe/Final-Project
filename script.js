// --- Expanded Data Model (The Core of Your Project) ---
const medicalData = [
  {
    disease: "Common Cold",
    symptoms: ["runny nose", "sore throat", "cough", "fatigue", "sneezing"],
    specialist: "General Practitioner (GP) / Family Doctor",
  },
  {
    disease: "Migraine",
    symptoms: ["severe headache", "nausea", "vomiting", "light sensitivity", "sound sensitivity"],
    specialist: "Neurologist or General Practitioner (GP)",
  },
  {
    disease: "Allergic Reaction",
    symptoms: ["hives", "itching", "swelling", "shortness of breath", "red eyes"],
    specialist: "Allergist or Emergency Room (ER) if severe",
  },
  {
    disease: "Tonsillitis/Strep Throat",
    symptoms: ["sore throat", "difficulty swallowing", "fever", "swollen glands", "white spots on tonsils"],
    specialist: "Otolaryngologist (ENT) or General Practitioner (GP)",
  },
  {
    disease: "Gastroenteritis (Stomach Flu)",
    symptoms: ["stomach pain", "diarrhea", "vomiting", "nausea", "abdominal cramps"],
    specialist: "General Practitioner (GP) or Gastroenterologist",
  },
  {
    disease: "Dermatitis (Skin Inflammation)",
    symptoms: ["rash", "itching", "redness", "flaking skin", "dry skin"],
    specialist: "Dermatologist",
  },
  {
    disease: "Urinary Tract Infection (UTI)",
    symptoms: ["painful urination", "frequent urination", "cloudy urine", "lower abdominal pain", "fever"],
    specialist: "Urologist or General Practitioner (GP)",
  },
  {
    disease: "Acute Sinusitis",
    symptoms: ["facial pain", "nasal congestion", "thick nasal discharge", "headache", "tooth pain"],
    specialist: "Otolaryngologist (ENT)",
  },
  {
    disease: "Anxiety/Panic Attack",
    symptoms: ["racing heart", "chest pain", "sweating", "shortness of breath", "dizziness"],
    specialist: "Cardiologist (to rule out heart issues) or Psychiatrist/Therapist",
  },
  {
    disease: "Arthritis (Inflammatory Joint Pain)",
    symptoms: ["joint pain", "stiffness", "swelling", "redness around joints", "limited range of motion"],
    specialist: "Rheumatologist",
  },
];


function checkSymptoms() {
    // 1. Get and Clean the User Input
    const inputElement = document.getElementById('symptom-input');
    const outputElement = document.getElementById('output');
    
    // Convert to lowercase, trim whitespace, and split by comma or newline
    const rawSymptoms = inputElement.value.toLowerCase().split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);
    
    // Clear previous results
    outputElement.innerHTML = '';
    
    if (rawSymptoms.length === 0) {
        outputElement.innerHTML = "<p class='warning'>Please enter at least one symptom to check.</p>";
        return;
    }

    // 2. The Matching Algorithm
    const matchResults = [];

    medicalData.forEach(item => {
        let matchCount = 0;
        
        // Loop through the user's symptoms
        rawSymptoms.forEach(userSymptom => {
            // Check if any of the disease's known symptoms INCLUDE the user's symptom fragment
            // This makes the system more flexible (e.g., "headache" matches "severe headache")
            const isMatch = item.symptoms.some(knownSymptom => {
                return knownSymptom.includes(userSymptom);
            });
            
            if (isMatch) {
                matchCount++;
            }
        });

        if (matchCount > 0) {
            matchResults.push({
                disease: item.disease,
                specialist: item.specialist,
                matches: matchCount,
                totalSymptoms: item.symptoms.length
            });
        }
    });

    // 3. Sort Results and Display
    
    // Sort by the number of matches (highest first)
    matchResults.sort((a, b) => b.matches - a.matches);

    let htmlOutput = '<h3>Possible Conditions:</h3>';
    
    if (matchResults.length === 0) {
        htmlOutput += "<p class='info'>No strong matches found in the prototype database. Please consult a GP if symptoms persist.</p>";
    } else {
        matchResults.slice(0, 4).forEach(result => { // Display top 4 results
            htmlOutput += `
                <div class="result-card">
                    <h4>${result.disease} (${result.matches} of ${result.totalSymptoms} key symptoms matched)</h4>
                    <p><strong>Recommended Specialist:</strong> ${result.specialist}</p>
                    <p class="advice">The system advises seeking assistance from a **${result.specialist}** for professional evaluation.</p>
                </div>
            `;
        });
    }

    outputElement.innerHTML = htmlOutput;
}