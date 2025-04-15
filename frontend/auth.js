document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
    });

    const result = await response.json();
    
    if (response.ok) {
        alert('Registration successful');
        window.location.href = 'todo.html';  
    } else {
        alert('Registration failed: ' + result.message);
    }
});

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    
    if (response.ok) {
        localStorage.setItem('token', result.token);  
        alert('Login successful');
        window.location.href = 'todo.html';  
    } else {
        alert('Login failed: ' + result.message);
    }
});


function showLoginForm() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}


function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';
}


if (localStorage.getItem('token')) {
    window.location.href = 'todolist.html';  
}
