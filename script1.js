document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const dobInput = document.getElementById("dob");
    const submitBtn = document.getElementById("submitBtn");

    const validateFullName = () => {
        const value = fullNameInput.value.trim();
        const regex = /^[A-Za-z\s]{3,}$/;
        const errorMessage = document.getElementById("fullNameError");
        if (regex.test(value)) {
            fullNameInput.classList.add("valid");
            fullNameInput.classList.remove("invalid");
            errorMessage.textContent = "";
            return true;
        } else {
            fullNameInput.classList.add("invalid");
            fullNameInput.classList.remove("valid");
            errorMessage.textContent = "Name must be at least 3 characters and only contain letters and spaces.";
            return false;
        }
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorMessage = document.getElementById("emailError");
        if (regex.test(value)) {
            emailInput.classList.add("valid");
            emailInput.classList.remove("invalid");
            errorMessage.textContent = "";
            return true;
        } else {
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
            errorMessage.textContent = "Invalid email format.";
            return false;
        }
    };

    const validatePassword = () => {
        const value = passwordInput.value;
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const errorMessage = document.getElementById("passwordError");
        if (regex.test(value)) {
            passwordInput.classList.add("valid");
            passwordInput.classList.remove("invalid");
            errorMessage.textContent = "";
            return true;
        } else {
            passwordInput.classList.add("invalid");
            passwordInput.classList.remove("valid");
            errorMessage.textContent = "Password must be at least 8 characters long and contain both letters and numbers.";
            return false;
        }
    };

    const validateConfirmPassword = () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorMessage = document.getElementById("confirmPasswordError");
        if (password === confirmPassword) {
            confirmPasswordInput.classList.add("valid");
            confirmPasswordInput.classList.remove("invalid");
            errorMessage.textContent = "";
            return true;
        } else {
            confirmPasswordInput.classList.add("invalid");
            confirmPasswordInput.classList.remove("valid");
            errorMessage.textContent = "Passwords do not match.";
            return false;
        }
    };

    const validateDOB = () => {
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        const errorMessage = document.getElementById("dobError");
        if (age >= 18) {
            dobInput.classList.add("valid");
            dobInput.classList.remove("invalid");
            errorMessage.textContent = "";
            return true;
        } else {
            dobInput.classList.add("invalid");
            dobInput.classList.remove("valid");
            errorMessage.textContent = "You must be at least 18 years old.";
            return false;
        }
    };

    const validateForm = () => {
        return validateFullName() && validateEmail() && validatePassword() && validateConfirmPassword() && validateDOB();
    };

    fullNameInput.addEventListener("input", validateFullName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", () => {
        validatePassword();
        validateConfirmPassword();
    });
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    dobInput.addEventListener("input", validateDOB);

    form.addEventListener("submit", (event) => {
        if (!validateForm()) {
            event.preventDefault();
        }
        else{
            event.preventDefault();
            window.location.href = "https://christuniversity.in/";
        }
    });

    const updateSubmitButtonState = () => {
        submitBtn.disabled = !validateForm();
    };

    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", updateSubmitButtonState);
    });

    updateSubmitButtonState(); 
});
