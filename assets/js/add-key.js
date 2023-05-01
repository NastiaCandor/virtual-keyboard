import Alphabets from './languages';
import keyCodes from './key-codes';

export default function addKey() {
  const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: [],
    },

    properties: {
      value: '',
      caret: 0,
      capsLock: false,
      shift: false,
    },

    init() {
      this.elements.main = document.querySelector('.keyboard');
      this.elements.main.appendChild(this.createKeys());
      this.elements.keys = this.elements.main.querySelectorAll('.keyboard__key_letter');
      document.querySelector('.main__textarea').addEventListener('input', (element) => {
        this.properties.value = element.target.value;
      });
    },

    // create keyboard layout for each language
    fillKeyboard(layout, ...classes) {
      const fragment = document.createDocumentFragment();
      const keyboardContainer = document.createElement('div');
      const textarea = document.querySelector('.main__textarea');
      let code = 0;
      keyboardContainer.classList.add(...classes);

      layout.forEach((key) => {
        const keyElement = document.createElement('button');
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('down', 'keyboard__key');

        // specify behaviour for each key
        switch (key) {
          case 'Tab':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_tab');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.printTab();
            });
            break;

          case 'Backspace':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_backspace');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.backspaceSimb();
            });
            break;

          case 'Caps':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_caps');
            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.toogleCaplsLock();
            });
            break;

          case 'Del':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_del');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.deleteSimb();
              this.print();
            });
            break;

          case 'Enter':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_enter');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.enterSimb();
            });
            break;

          case 'Space':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_space');
            keyElement.addEventListener('click', () => {
              textarea.focus();
              this.spaceSimb();
            });
            break;

          case 'Shift':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_shift');

            keyElement.textContent += key;

            keyElement.addEventListener('mousedown', () => {
              this.toogleCaplsLock(true);
              this.toogleShift();
            });
            keyElement.addEventListener('mouseup', () => {
              this.toogleCaplsLock(true);
              this.toogleShift();
            });

            break;

          case 'Alt':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_alt');
            keyElement.textContent += key;
            break;

          case 'Win':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_win');
            keyElement.textContent += key;
            break;

          case 'Ctrl':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_ctrl');
            keyElement.textContent += key;
            break;

          default:
            keyElement.innerHTML = key;
            keyElement.classList.add('keyboard__key_letter');

            keyElement.addEventListener('click', () => {
              textarea.focus();
              const isCaps = this.properties.capsLock;
              const simb = keyElement.innerHTML;
              const newSimb = isCaps ? simb.toUpperCase() : simb.toLowerCase();
              this.properties.value = this.createNewValue(this.properties.caret, newSimb);
              this.properties.caret += 1;
              this.print();
            });
            break;
        }

        keyElement.classList.add(keyCodes[code]);
        code += 1;

        fragment.appendChild(keyElement);
      });

      keyboardContainer.appendChild(fragment);

      return keyboardContainer;
    },

    // create keyboard according Alphabets file
    createKeys() {
      const fragment = document.createDocumentFragment();

      Object.keys(Alphabets).forEach((key) => {
        if (localStorage.getItem('lang') === key) {
          const regCurrentLangKeyboard = this.fillKeyboard(Alphabets[key].reg, 'keyboard_visible', `keyboard__${key}`, `keyboard__${key}-reg`);
          const shiftCurentLangKeyboard = this.fillKeyboard(Alphabets[key].shift, 'keyboard_hidden', `keyboard__${key}`, `keyboard__${key}-shift`);
          fragment.appendChild(regCurrentLangKeyboard);
          fragment.appendChild(shiftCurentLangKeyboard);
        } else {
          const regLangKeyboard = this.fillKeyboard(Alphabets[key].reg, 'keyboard_hidden', `keyboard__${key}`, `keyboard__${key}-reg`);
          const shiftLangKeyboard = this.fillKeyboard(Alphabets[key].shift, 'keyboard_hidden', `keyboard__${key}`, `keyboard__${key}-shift`);
          fragment.appendChild(regLangKeyboard);
          fragment.appendChild(shiftLangKeyboard);
        }
      });

      return fragment;
    },

    // create new string with new simbol
    createNewValue(pos, simbol) {
      const oldStr = this.properties.value;
      let newStr = oldStr.substring(0, pos) + simbol;
      newStr += oldStr.substring(pos, oldStr.length);
      return newStr;
    },

    // print new string to textarea
    print() {
      document.querySelector('.main__textarea').value = this.properties.value;
      document.querySelector('.main__textarea').setSelectionRange(this.properties.caret, this.properties.caret);
    },

    // CapsLock behaviour
    toogleCaplsLock() {
      this.properties.capsLock = !this.properties.capsLock;
      const capsKeys = document.querySelectorAll('.CapsLock');
      const isShift = document.querySelector('.keyboard__key_shift');
      capsKeys.forEach((el) => {
        if (!isShift) {
          if (this.properties.capsLock) {
            el.classList.add('keyboard__key_active');
          } else {
            el.classList.remove('keyboard__key_active');
          }
        }
      });
      this.elements.keys.forEach((key) => {
        const isCaps = this.properties.capsLock;
        // eslint-disable-next-line no-param-reassign
        key.textContent = isCaps ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      });
    },

    // Shift behaviour
    toogleShift() {
      const currentLang = localStorage.getItem('lang');
      document.querySelector('.main__textarea').focus();

      this.properties.shift = !this.properties.shift;

      if (this.properties.shift) {
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.remove('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.add('keyboard_hidden');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.add('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.remove('keyboard_hidden');
      } else {
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.add('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-reg`).classList.remove('keyboard_hidden');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.remove('keyboard_visible');
        document.querySelector(`.keyboard__${currentLang}-shift`).classList.add('keyboard_hidden');
      }
    },

    // check on what position is caret
    checkcaret() {
      const newCaretPos = document.querySelector('.main__textarea').selectionStart;
      if (newCaretPos !== this.properties.caret) {
        this.properties.caret = newCaretPos;
      }
    },

    backspaceSimb() {
      const currentPos = this.properties.caret;
      const curValue = this.properties.value;
      if (currentPos !== 0) {
        const newStr = curValue.slice(0, currentPos - 1) + curValue.slice(currentPos);
        this.properties.caret -= 1;
        this.properties.value = newStr;
        this.print();
      }
    },

    deleteSimb() {
      const currentPos = this.properties.caret;
      const curValue = this.properties.value;
      const newStr = curValue.slice(0, currentPos) + curValue.slice(currentPos + 1);
      this.properties.value = newStr;

      this.print();
    },

    enterSimb() {
      this.properties.value = this.createNewValue(this.properties.caret, '\n');
      this.properties.caret += 1;
      this.print();
    },

    spaceSimb() {
      this.properties.value = this.createNewValue(this.properties.caret, ' ');
      this.properties.caret += 1;
      this.print();
    },

    printTab() {
      this.properties.value = this.createNewValue(this.properties.caret, '    ');
      this.properties.caret += 4;
      this.print();
    },

    printArrow(simb) {
      this.properties.value = this.createNewValue(this.properties.caret, simb);
      this.properties.caret += 1;
      this.print();
    },

    printSimb(simb) {
      const isCaps = document.querySelector('.CapsLock').classList.contains('keyboard__key_active');
      const isShift = this.properties.shift;
      const isUpper = ((isCaps && !isShift) || (!isCaps && isShift));
      // console.log(isUpper);
      const newSimb = isUpper ? simb.toUpperCase() : simb.toLowerCase();
      this.properties.value = this.createNewValue(this.properties.caret, newSimb);
      this.properties.caret += 1;
      this.print();
    },
  };

  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
    const textarea = document.querySelector('.main__textarea');
    textarea.focus();
    textarea.addEventListener('select', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('selectstart', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('input', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('cut', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('paste', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('click', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('mousedown', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('keypress', Keyboard.checkcaret.bind(Keyboard));
    textarea.addEventListener('keydown', (el) => {
      Keyboard.checkcaret.bind(Keyboard);
      const isPrint = ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight'].indexOf(el.coded) !== -1;
      if (!isPrint) {
        el.preventDefault();
      }
    });

    document.addEventListener('keydown', (event) => {
      const keyCode = String(event.code);
      const isPrint = ['Backspace', 'Enter', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Tab', 'Delete', 'MetaLeft'].indexOf(keyCode) !== -1;
      // set real keyboard behaviour
      switch (keyCode) {
        case 'CapsLock':
          Keyboard.toogleCaplsLock();
          break;

        case 'ShiftLeft':
          Keyboard.toogleShift();
          Keyboard.toogleCaplsLock();
          break;

        case 'ShiftRight':
          Keyboard.toogleShift();
          Keyboard.toogleCaplsLock();
          break;

        case 'ArrowUp':
          Keyboard.printArrow('⇧');
          break;

        case 'ArrowDown':
          Keyboard.printArrow('⇩');
          break;

        case 'ArrowLeft':
          Keyboard.printArrow('⇦');
          break;

        case 'ArrowRight':
          Keyboard.printArrow('⇨');
          break;

        case 'Tab':
          Keyboard.printTab();
          break;

        case 'Backspace':
          Keyboard.backspaceSimb();
          break;

        case 'Delete':
          Keyboard.deleteSimb();
          break;

        case 'Enter':
          Keyboard.enterSimb();
          break;

        case 'Space':
          Keyboard.spaceSimb();
          break;

        // set behaviour for normal letters
        default:
          if (!isPrint) {
            const isShift = document.querySelector('.keyboard__key_shift ').classList.contains('keyboard__key_active');
            const keyType = !isShift ? '-reg' : '-shift';
            const currKeyBoard = document.querySelector(`.keyboard__${localStorage.getItem('lang')}${keyType}`);
            const currKey = currKeyBoard.querySelector(`.${keyCode}`);
            if (currKey.innerHTML === '&lt;') {
              Keyboard.printSimb('<');
            } else if (currKey.innerHTML === '&gt;') {
              Keyboard.printSimb('>');
            } else if (currKey.innerHTML === '&amp;') {
              Keyboard.printSimb('&');
            } else {
              Keyboard.printSimb(currKey.innerHTML);
            }
          }
          break;
      }
    });
    document.addEventListener('keyup', (event) => {
      const keyCode = String(event.code);
      switch (keyCode) {
        case 'ShiftLeft':
          Keyboard.toogleShift();
          Keyboard.toogleCaplsLock(true);
          break;

        case 'ShiftRight':
          Keyboard.toogleShift();
          Keyboard.toogleCaplsLock(true);
          break;

        default:
          break;
      }
    });
  });
}
