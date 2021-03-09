

export function getDataFromForm(formData) {
    const formContence = {};

    for (const [name, value] of formData.entries()) {
        formContence[name] = value;
    }

    return formContence;
}

