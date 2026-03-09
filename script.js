function validateInput(input) {
    const error = document.getElementById(input.getAttribute("aria-describedby"));

    if (input.type == "email" && (input.value.trim() == "" || !input.validity.valid)) {
        error.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.classList.add("error");
        return;
    }

    if ((input.type == "text" || input.tagName == "TEXTAREA") && input.value.trim() == "") {
        error.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.classList.add("error");
        return;
    }

    if (input.type == "checkbox" && !input.checked) {
        error.hidden = false;
        input.setAttribute("aria-invalid", "true");
        return;
    }

    error.hidden = true;
    input.classList.remove("error");
    input.setAttribute("aria-invalid", "false");
}

const form = document.querySelector("form");
const inputs = form.querySelectorAll("input:not([type='radio']), textarea");

inputs.forEach(input => input.addEventListener("input", () => validateInput(input)));

const radios = form.querySelectorAll("input[type='radio']");
const radioError = document.getElementById(radios[0].getAttribute("aria-describedby"));

radios.forEach(radio => radio.addEventListener("change", () => {
    radioError.hidden = true;
    radios.forEach(r => r.setAttribute("aria-invalid", "false"));
}));

const successToast = document.getElementById("success-toast");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputs.forEach(input => validateInput(input));

    const selected = [...radios].some(radio => radio.checked);

    if (!selected) {
        radioError.hidden = false;
        radios.forEach(radio => radio.setAttribute("aria-invalid", "true"));
    }
    else {
        radioError.hidden = true;
        radios.forEach(radio => radio.setAttribute("aria-invalid", "false"));
    }

    const errors = form.querySelectorAll("[aria-invalid='true']").length;

    if (errors == 0) {
        successToast.hidden = false;
        form.reset();
        setTimeout(() => successToast.classList.add("show"), 1);

        setTimeout(() => successToast.classList.remove("show"), 4000);
        setTimeout(() => successToast.hidden = true, 4600);
    }
});