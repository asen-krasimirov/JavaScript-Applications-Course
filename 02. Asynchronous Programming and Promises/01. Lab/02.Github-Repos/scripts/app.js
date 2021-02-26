function loadRepos() {
	/*
	<ul id="repos">
		<li>
			<a href="{repo.html_url}">
				{repo.full_name}
			</a>
		</li>
	</ul>
	*/

	const elementList = document.getElementById('repos');
	const usernameInput = document.getElementById('username');

	let url = `https://api.github.com/users/${usernameInput.value}/repos`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`${response.status} error has occured!`);
			}
			return response.json();
		})
		.then(promise => {
			elementList.innerHTML = '';
			promise.forEach(repo => {
				elementList.appendChild(createLiElem(repo.full_name, repo.html_url));
			})
		})
		.catch(error => console.log(error));
	
	function createLiElem(name, href) {
		const newElem = document.createElement('li');

		const anchorElem = document.createElement('a');
		anchorElem.href = href;
		anchorElem.textContent = name;

		newElem.appendChild(anchorElem);
		return newElem;
	}
}
