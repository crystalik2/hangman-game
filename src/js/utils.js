export const darkModeHandle = () => {
  const darkModeSwitcher = document.getElementById('toggle_dark_mode');
  const htmlElement = document.documentElement;

  if (localStorage.getItem('mode') === 'dark') {
    htmlElement.classList.add('dark');
    darkModeSwitcher.checked = true;
  }

  darkModeSwitcher.addEventListener('input', () => {
    htmlElement.classList.toggle('dark');

    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('mode', 'dark');
    } else {
      localStorage.setItem('mode', 'light');
    }
  });
};

export const chooseDifficulty = () => {
  const selectElement = document.getElementById('difficulty_select');
  let selectedOption = selectElement.value;
  
  if (!localStorage.getItem('difficulty')) {
    localStorage.setItem('difficulty', selectedOption);
  }

  selectElement.value = localStorage.getItem('difficulty');

  selectElement.addEventListener('change', () => {
    selectedOption = selectElement.value;
    localStorage.setItem('difficulty', selectedOption);
  });
};
