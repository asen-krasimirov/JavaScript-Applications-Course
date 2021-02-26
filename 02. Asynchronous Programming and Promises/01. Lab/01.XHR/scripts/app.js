function loadRepos() {
   const resultElement = document.getElementById('res');
   const url = 'https://api.github.com/users/testnakov/repos';

   fetch(url)
      .then(stream => stream.json())
      .then(renderResponse)
      .catch(error => console.log(error));
   
   function renderResponse(response) {
      resultElement.innerHTML = '';
      for (const repo of response) {
         resultElement.textContent += `${repo.name}\n`;
      }
   }
}