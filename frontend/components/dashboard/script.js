const jsonData = JSON.parse(sessionStorage.getItem('user'));
const user_data = jsonData.data
if (user_data) {
    console.log('userdata:',user_data);
    const welcomeHeader = document.getElementById('welcomeMessage');
    welcomeHeader.innerText = `Hi, ${user_data.username}!`;

    if (user_data.role !== "admin") {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'none';
        });
    }
} 

