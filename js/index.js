const eventos = {
  "2026-01-01": "🎊 Feriado: Dia da Paz Mundial",
  "2026-01-15": "Reunião de Pais",
  "2026-01-25": "Entrega de Boletins"
};

const ferias = {
  janeiro: true  // Todo janeiro é férias
};

let currentDate = new Date(2026, 0, 1);

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Atualizar título
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
  
  // Calcular primeiro dia do mês e número de dias
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Limpar calendário anterior
  const calendarDays = document.getElementById('calendar-days');
  calendarDays.innerHTML = '';
  
  // Adicionar dias em branco antes do primeiro dia
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'empty-day';
    calendarDays.appendChild(emptyDay);
  }
  
  // Renderizar dias
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.textContent = day;

    const dateKey = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    
    const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const currentMonthName = monthNames[month];

    // Se for férias, destacar com cor especial
    if (ferias[currentMonthName]) {
      dayElement.style.background = "#e8f4f8";
      dayElement.style.border = "1px solid var(--turquesa)";
      dayElement.classList.add('ferias');
    }

    // Se for evento, destacar ainda mais
    if (eventos[dateKey]) {
      dayElement.style.border = "2px solid var(--amarelo)";
      dayElement.style.background = "#fff8e6";
      dayElement.classList.add('evento');
    }

    dayElement.addEventListener("click", () => {
      showEvents(dateKey);
    });

    calendarDays.appendChild(dayElement);
  }
}

function showEvents(dateKey) {
  const list = document.getElementById("event-items");
  if (!list) return;
  list.innerHTML = "";

  // Atualizar título/data selecionada no painel
  const selectedDateEl = document.getElementById("selected-date");
  const parts = dateKey.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);

  const monthNamesDisplay = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                      'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  if (selectedDateEl) {
    selectedDateEl.textContent = `${day} de ${monthNamesDisplay[month]} de ${year}`;
  }

  const monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const currentMonthName = monthNames[month];

  let hasContent = false;

  // Verificar se é férias
  if (ferias[currentMonthName]) {
    const item = document.createElement("li");
    item.textContent = "📚 Período de Férias Escolares";
    item.style.color = "var(--turquesa)";
    item.style.fontWeight = "600";
    list.appendChild(item);
    hasContent = true;
  }

  // Verificar se tem eventos
  if (eventos[dateKey]) {
    const item = document.createElement("li");
    item.textContent = eventos[dateKey];
    item.style.color = "var(--amarelo)";
    item.style.fontWeight = "600";
    list.appendChild(item);
    hasContent = true;
  }

  if (!hasContent) {
    list.innerHTML = "<li>Sem eventos para esta data.</li>";
  }
}

// Event listeners para navegação
document.getElementById('prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Renderizar calendário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
});