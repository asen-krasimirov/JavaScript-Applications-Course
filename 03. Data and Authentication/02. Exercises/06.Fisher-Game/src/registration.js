
function registerSolution() {
  const registerURL = 'http://localhost:3030/users/register';

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    let { email, password, rePass } = getDataFromForm(formData);
    try {

      if (!email || !password || !rePass) {
        throw new Error('All fields must be filled!');
      } else if (password !== rePass) {
        throw new Error('Both passwords must match!');
      }

      const response = await fetch(registerURL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error(`${response.status} error occured!`);
      }

      const data = await response.json();
      sessionStorage.authToken = data.accessToken;
      window.location.href = "http://localhost:3000/index.html";

    } catch (error) {
      alert(error.message); return;
    }
  });
}

function loginSolution() {
  const registerURL = 'http://localhost:3030/users/login';

  const registerForm = document.getElementById('loginForm');
  registerForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    let { email, password } = getDataFromForm(formData);
    try {

      if (!email || !password) {
        throw new Error('All fields must be filled!');
      }

      const response = await fetch(registerURL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        if (response.status == '403') {
          throw new Error(`You have not registered yet!`);
        }
        throw new Error(`${response.status} error occured!`);
      }

      const data = await response.json();
      sessionStorage.authToken = data.accessToken;
      window.location.href = "http://localhost:3000/index.html";

    } catch (error) {
      alert(error.message); return;
    }
  });
}


registerSolution();
loginSolution();