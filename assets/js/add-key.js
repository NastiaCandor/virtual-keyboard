import Alphabets from './languages';

export default function addKey() {
  const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
    },

    eventHandlers: {
      oninput: null,
      onclose: null,
    },

    properties: {
      value: '',
      caret: 0,
      capsLock: false,
      shift: false,
      alt: false,
      shiftLeft: false,
      altLeft: false,
    },

    init() {
      this.elements.main = document.querySelector('.keyboard');
      this.elements.main.appendChild(this.createKeys());
      this.elements.keys = this.elements.main.querySelectorAll('.keyboard__key_letter');
      document.querySelector('.main__textarea').addEventListener('input', (element) => {
        this.properties.value = element.target.value;
      });
    },

    fillKeyboard(layout, ...classes) {
      const fragment = document.createDocumentFragment();
      const keyboardContainer = document.createElement('div');
      const textarea = document.querySelector('.main__textarea');
      keyboardContainer.classList.add(...classes);

      layout.forEach((key) => {
        const keyElement = document.createElement('button');
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('down', 'keyboard__key');

        switch (key) {
          case 'Tab':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_tab');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.properties.value += '\t';
              this.print();
            });
            break;

          case 'Backspace':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_backspace');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              const currentPos = this.properties.caret;
              const curValue = this.properties.value;
              const newStr = curValue.slice(0, currentPos - 1) + curValue.slice(currentPos);
              this.properties.caret -= 1;
              this.properties.value = newStr;
              this.print();
            });
            break;

          case 'Caps':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_caps');
            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.toogleCaplsLock();
              keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
            });
            break;

          case 'Del':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_del');
            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {
              textarea.focus();
              const newValue = this.properties.value.substring(0, this.properties.value.length - 1);
              this.properties.value = newValue;
              this.print();
            });
            break;

          case 'Enter':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_enter');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.properties.value += '\n';
              this.print();
            });
            break;

          case 'Space':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_space');
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.properties.value += ' ';
              this.print();
            });
            break;

          case 'Shift':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_shift');

            keyElement.textContent += key;

            keyElement.addEventListener('mousedown', () => {
              this.toogleCaplsLock();
              this.toogleShift();
            });
            keyElement.addEventListener('mouseup', () => {
              this.toogleCaplsLock();
              this.toogleShift();
            });

            break;
          case 'Alt':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_alt');

            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {

            });
            break;
          case 'Win':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_win');

            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {

            });
            break;
          case 'Ctrl':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_ctrl');

            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {

            });
            break;

          default:
            if (key.length === 1 && key.match(/[a-z]/i)) {
              keyElement.innerHTML = key.toLowerCase();
            } else {
              keyElement.innerHTML = key;
            }
            keyElement.classList.add('keyboard__key_letter');

            keyElement.addEventListener('click', () => {
              const isCaps = this.properties.capsLock;
              // const curPos = this.properties.caret;
              this.properties.value += isCaps ? key.toUpperCase() : key.toLowerCase();
              this.print();
            });
            break;
        }

        fragment.appendChild(keyElement);
      });

      keyboardContainer.appendChild(fragment);

      return keyboardContainer;
    },

    createKeys() {
      const fragment = document.createDocumentFragment();

      Object.keys(Alphabets).forEach((key) => {
        if (localStorage.getItem('lang') === key) {
          const regCurrentLangKeyboard = this.fillKeyboard(Alphabets[key].reg, 'keyboard_visible', `keyboard__${key}`, `keyboard__${key}-reg`);
          const shiftCurentLangKeyboard = this.fillKeyboard(Alphabets[key].shift, 'keyboard_hidden', `keyboard__${key}`, `keyboard__${key}-shift`);
          fragment.appendChild(regCurrentLangKeyboard);
          fragment.appendChild(shiftCurentLangKeyboard);
        } else {
          const regLangKeyboard = this.fillKeyboard(Alphabets[key].shift, 'keyboard_hidden', `keyboard__${key}`, `keyboard__${key}-reg`);
          const shiftLangKeyboard = this.fillKeyboard(Alphabets[key].shift, 'keyboard_hidden', `keyboard__${key}`, `keyboard__${key}-shift`);
          fragment.appendChild(regLangKeyboard);
          fragment.appendChild(shiftLangKeyboard);
        }
      });

      return fragment;
    },

    // triggerEvent(handlerName) {
    //   if (typeof this.eventHandlers[handlerName] === 'function') {
    //     this.eventHandlers[handlerName](this.properties.value);
    //   }
    // },

    print() {
      document.querySelector('.main__textarea').value = this.properties.value;
    },

    // getCurrentPosition(element) {
    //   const
    // },

    toogleCaplsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      this.elements.keys.forEach((key) => {
        const isCaps = this.properties.capsLock;
        // eslint-disable-next-line no-param-reassign
        key.textContent = isCaps ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      });
    },

    toogleShift() {
      const currentLang = localStorage.getItem('lang');

      this.properties.shift = !this.properties.shift;

      if (this.properties.shift) {
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.remove('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.add('keyboard_hidden');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.add('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.remove('keyboard_hidden');
        if (!this.properties.capsLock) {
          const capsKeys = document.querySelectorAll('.keyboard__key_caps');
          capsKeys.forEach((key) => {
            key.classList.add('keyboard__key_active');
          });
        }
      } else {
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.add('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.remove('keyboard_hidden');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.remove('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.add('keyboard_hidden');
        if (!this.properties.capsLock) {
          const capsKeys = document.querySelectorAll('.keyboard__key_caps');
          capsKeys.forEach((key) => {
            key.classList.remove('keyboard__key_active');
          });
        }
      }
    },

    changeLanguage() {

    },

    pressTab() {

    },

    checkcaret() {
      const newCaretPos = document.querySelector('.main__textarea').selectionStart;
      // console.log(newCaretPos);
      // console.log(this.properties.caret);
      if (newCaretPos !== this.properties.caret) {
        this.properties.caret = newCaretPos;
        // console.log(this.properties.caret);
      }
    },
  };

  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
    const textarea = document.querySelector('.main__textarea');
    textarea.addEventListener('select', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('selectstart', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('input', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('cut', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('paste', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('click', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('mousedown', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('keypress', Keyboard.checkcaret.bind(Keyboard));
  });
}
