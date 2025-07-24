
function handleLogin(){
    const form = document.getElementById('loginForm');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('user', JSON.stringify({ data }));

                // Redirect to dashboard
                window.location.href = '../dashboard/dashboard.html';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
}

handleLogin()
