document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
      window.location.href = 'index.html'; // Redirige al login si no está autenticado
      return;
  }
document.getElementById('codigo').textContent = user.codigo;
  document.getElementById('nombre').textContent = user.nombre

  fetch(`https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${user.codigo}/notas`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          let totalCreditos = 0;
          let auxiliar = 0;
          const tableBody = document.getElementById('notasTabla').getElementsByTagName('tbody')[0];
          data.notas.forEach(asignatura => {
              const n1 = parseFloat(asignatura.n1);
              const n2 = parseFloat(asignatura.n2);
              const n3 = parseFloat(asignatura.n3);
              const ex = parseFloat(asignatura.ex);
              const creditos = parseFloat(asignatura.creditos);

              const def = (n1 + n2 + n3) / 3 * 0.7 + ex * 0.3;
              auxiliar += def * creditos;
              totalCreditos += creditos;
              let row = tableBody.insertRow();
              row.innerHTML = `
                  <td>${asignatura.asignatura}</td>
                  <td>${asignatura.creditos}</td>
                  <td>${n1}</td>
                  <td>${n2}</td>
                  <td>${n3}</td>
                  <td>${ex}</td>
                  <td>${def.toFixed(2)}</td>
              `;
          });
          document.getElementById('promedioPonderado').textContent = (auxiliar / totalCreditos).toFixed(2);
      });
});

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}