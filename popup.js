const defaultExtraWords = [
    "a", "this", "an", "the", "and", "but", "or", "nor", "for", "so", "yet", "because",
    "while", "in", "on", "at", "by", "for", "with", "of", "I", "my", "to", "it", "me",
    "is", "has", "have", "this", "these", "can", "from", "there", "into", "not", "their", 
    "how", "why", "when", "also", "what", "he", "his", "him", "she", "her", "hers", "they", 
    "them", "be", "am", "who", "as", "that", "i", "was"
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    const savedExtraWords = localStorage.getItem('extraWords');
    const savedInputText = localStorage.getItem('inputText');
  
    if (savedExtraWords) {
      document.getElementById("extraWordsInput").value = savedExtraWords;
    } else {
      document.getElementById("extraWordsInput").value = defaultExtraWords.join(", ");
    }
  
    if (savedInputText) {
      document.getElementById("inputText").value = savedInputText;
    }
  });
  
  document.getElementById("checkButton").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    const extraWords = getExtraWords();
    const repeatedWords = checkRepeat(inputText, extraWords);
  
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
  
    if (Object.keys(repeatedWords).length === 0) {
      outputDiv.textContent = "No repeated words found!";
    } else {
      Object.entries(repeatedWords)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word, count]) => {
          const wordElement = document.createElement("div");
          wordElement.textContent = `${word}: ${count} times`;
          outputDiv.appendChild(wordElement);
        });
    }
  });
  
  document.getElementById("extraWordsInput").addEventListener('input', () => {
    const extraWords = document.getElementById("extraWordsInput").value;
    localStorage.setItem('extraWords', extraWords);
  });
  
  document.getElementById("inputText").addEventListener('input', () => {
    const inputText = document.getElementById("inputText").value;
    localStorage.setItem('inputText', inputText);
  });
  
  document.getElementById("toggleExtraWordsButton").addEventListener('click', () => {
    const extraWordsBox = document.getElementById("extraWordsBox");
    const toggleButton = document.getElementById("toggleExtraWordsButton");
  
    if (extraWordsBox.style.display === 'none' || extraWordsBox.style.display === '') {
      extraWordsBox.style.display = 'block';
      toggleButton.textContent = "Hide Ignored Words";
      toggleButton.classList.remove("show-button");
      toggleButton.classList.add("hide-button");
    } else {
      extraWordsBox.style.display = 'none';
      toggleButton.textContent = "Show Ignored Words";
      toggleButton.classList.remove("hide-button");
      toggleButton.classList.add("show-button");
    }
  });
  
  function removePunctuation(word) {
    return word.replace(/[^\w\s]/g, "");
  }
  
  function getExtraWords() {
    const input = document.getElementById("extraWordsInput").value;
    return input
      .toLowerCase()
      .split(",")
      .map(word => word.trim())
      .filter(word => word.length > 0);
  }
  
  function checkRepeat(text, extraWords) {
    const arrayText = text.trim().split(/\s+/);
    const cleanedWords = arrayText.map(word => removePunctuation(word.toLowerCase()));
  
    const wordCounts = {};
    const repeatedWords = {};
  
    cleanedWords.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  
    cleanedWords.forEach(word => {
      if (wordCounts[word] > 1 && !extraWords.includes(word)) {
        repeatedWords[word] = wordCounts[word];
      }
    });
  
    return repeatedWords;
  }
  