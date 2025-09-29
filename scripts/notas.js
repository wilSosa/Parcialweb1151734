document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      window.location.href = 'index.html'; // Redirige al login si no está autenticado
      return;
  }
}