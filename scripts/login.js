document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var codigo = document.getElementById('codigo').value;
  var password = document.getElementById('password').value;

  fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ codigo: codigo, clave: password })
  })
      .then(response => response.json())
      .then(data => {
          if (data.codigo) {
              localStorage.setItem('user', JSON.stringify(data));
              window.location.href = 'notas.html'; // Redirige a la página de notas
          } else {
              throw new Error('Credenciales no válidas');
          }
      })
      .catch(error => {
          document.getElementById('errorMessage').textContent = 'Credenciales no válidas';
          document.getElementById('codigo').value = '';
          document.getElementById('password').value = '';
      });
});