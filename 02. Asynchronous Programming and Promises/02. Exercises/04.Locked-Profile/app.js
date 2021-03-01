

async function lockedProfile() {
    const profileHolder = document.getElementById('main');

    let url = `http://localhost:3030/jsonstore/advanced/profiles`;
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error occured!`);
        }

        const userDatabase = await response.json();
    
        let usernameNumber = 1;
    
        for (let userId in userDatabase) {
            const userData = userDatabase[userId];
            const newProfileCard = createProfileCard(userData.username, userData.email, userData.age, usernameNumber++);
            profileHolder.appendChild(newProfileCard);
        }
    } catch (error) { alert(error.message) }

    function createProfileCard(username, email, age, number) {
        const newProfile = e('div', [['className', 'profile']],
            e('img', [['src', './iconProfile2.png'], ['className', 'userIcon']]),
            e('label', [['textContent', 'Lock']]),
            e('input', [['type', 'radio'], ['name', `user${number}Locked`], ['value', 'lock'], ['checked', true]]),
            e('label', [['textContent', 'Unlock']]),
            e('input', [['type', 'radio'], ['name', `user${number}Locked`], ['value', 'unlock'], ['checked', false]]),
            e('br', []),
            e('hr', []),
            e('label', [['textContent', 'Username']]),
            e('input', [['type', 'text'], ['name', `user${number}Username`], ['value', username], ['disabled', true], ['readonly', true]]),
        );

        // creating hidden information
        const hiddenInformation = e('div', [['id', `user${number}HiddenFields`]],
            e('hr', []),
            e('label', [['textContent', 'Email:']]),
            e('input', [['type', 'email'], ['name', `user${number}Email`], ['value', email], ['disabled', true], ['readonly', true]]),
            e('label', [['textContent', 'Age:']]),
            e('input', [['type', 'email'], ['name', `user${number}Age`], ['value', age], ['disabled', true], ['readonly', true]]),
        );
        hiddenInformation.style.display = 'none';

        // creating the button for more info
        const informationButton = e('button', [['textContent', 'Show more']]);
        informationButton.addEventListener('click', () => {
            // if the profile is locked -> do nothing
            if (!newProfile.querySelector('input').checked) {
                hiddenInformation.style.display = (hiddenInformation.style.display === 'block') ? 'none' : 'block';
                informationButton.textContent = (hiddenInformation.style.display === 'block') ? 'Hide it' : 'Show more';
            }
        });
        
        // adding the extra elements
        newProfile.appendChild(hiddenInformation);
        newProfile.appendChild(informationButton);

        return newProfile;
    }
}

function e(type, attributes, ...children) {

    // function for creating custom DOM elements

    const newElem = document.createElement(type);

    for (let [name, value] of attributes) {
        newElem[name] = value;
    }

    for (const elem of children) {
        newElem.appendChild(elem);
    }

    return newElem;
}
