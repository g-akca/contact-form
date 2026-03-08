function validateInput(input) {
    const error = input.closest(".input-div, .textarea-div, fieldset").querySelector(".error-text");

    if (input.type == "email" && (input.value.trim() == "" || !input.validity.valid)) {
        error.hidden = false;
        input.classList.add("error");
        return;
    }

    if ((input.type == "text" || input.tagName == "TEXTAREA") && input.value.trim() == "") {
        error.hidden = false;
        input.classList.add("error");
        return;
    }

    if (input.type == "checkbox" && !input.checked) {
        error.hidden = false;
        return;
    }

    error.hidden = true;
    input.classList.remove("error");
}

const form = document.querySelector("form");
const inputs = form.querySelectorAll("input:not([type='radio']), textarea");

inputs.forEach(input => {
    input.addEventListener("input", () => validateInput(input));
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputs.forEach(input => validateInput(input));

    const radios = form.querySelectorAll("input[type='radio']");
    const radioError = form.querySelector(".query-div .error-text");

    const selected = [...radios].some(radio => radio.checked);
    radioError.hidden = selected;

    radios.forEach(radio => radio.addEventListener("change", () => radioError.hidden = true));
});