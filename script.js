document.getElementById('brief-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const brief = [
    'ТАБЕЛЬ — бриф на видео',
    '',
    `Имя: ${data.get('name').trim()}`,
    `Связь: ${data.get('contact').trim()}`,
    `Тип видео: ${data.get('type')}`,
    `Желаемая дата: ${data.get('date') || 'Не указана'}`,
    `ИИ-сцены: ${data.has('ai') ? 'Рассматриваю' : 'Обсудим'}`,
    '',
    'Задача:',
    data.get('description').trim(),
    '',
    `Материалы / референсы: ${data.get('references').trim() || 'Не указаны'}`,
  ].join('\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', brief], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tabel-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.getElementById('form-status').textContent = 'Бриф подготовлен для скачивания. Заявка не отправлена — сохраните файл для обсуждения проекта.';
});
