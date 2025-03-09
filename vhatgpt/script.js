let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

// File Upload Handling
const fileInput = document.getElementById('fileUpload');
fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        if (selectedFile.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fileContent = event.target.result;
                document.querySelector("textarea").value = fileContent;
            };
            reader.readAsText(selectedFile);
        } else {
            alert('Please select a valid text file (.txt)');
            fileInput.value = ''; 
        }
    }
});

// Voice change handler
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Speak button handler
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
