function isCaps(el) {
  return (el.classList.contains('keyboard__key_active'));
}

function viewCurrentLangKeyboard(prevLang, currLang) {
  document.querySelector(`.keyboard__${prevLang}-reg`).classList.remove('keyboard_visible');
  document.querySelector(`.keyboard__${prevLang}-shift`).classList.remove('keyboard_visible');
  document.querySelector(`.keyboard__${prevLang}-reg`).classList.add('keyboard_hidden');
  document.querySelector(`.keyboard__${prevLang}-shift`).classList.add('keyboard_hidden');

  document.querySelector(`.keyboard__${currLang}-reg`).classList.remove('keyboard_hidden');
  document.querySelector(`.keyboard__${currLang}-reg`).classList.add('keyboard_visible');
  document.querySelector(`.keyboard__${currLang}-shift`).classList.remove('keyboard_visible');
  document.querySelector(`.keyboard__${currLang}-shift`).classList.add('keyboard_hidden');
}

export default function trackKeys() {
  document.addEventListener('keydown', (event) => {
    const keyCode = `.${event.code}`;
    const keyButtons = document.querySelectorAll(keyCode);
    keyButtons.forEach((el) => {
      if (keyCode !== '.CapsLock') {
        el.classList.add('keyboard__key_active');
      } else if (isCaps(el)) {
        el.classList.remove('keyboard__key_active');
      } else {
        el.classList.add('keyboard__key_active');
      }
    });
    // change language layout
    const isShiftLeftOn = document.querySelector('.ShiftLeft').classList.contains('keyboard__key_active');
    const isControlLeftOn = document.querySelector('.ControlLeft').classList.contains('keyboard__key_active');
    if (isShiftLeftOn && isControlLeftOn) {
      if (localStorage.getItem('lang') === 'eng') {
        viewCurrentLangKeyboard('eng', 'ru');
        localStorage.setItem('lang', 'ru');
      } else {
        viewCurrentLangKeyboard('ru', 'eng');
        localStorage.setItem('lang', 'eng');
      }
    }
  });
  document.addEventListener('keyup', (event) => {
    const keyCode = `.${event.code}`;
    const keyButtons = document.querySelectorAll(keyCode);
    keyButtons.forEach((el) => {
      if (keyCode !== '.CapsLock') {
        el.classList.remove('keyboard__key_active');
      }
    });
  });
}
