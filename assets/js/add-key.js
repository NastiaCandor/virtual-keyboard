import { Alphabets } from './languages';

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
      capsLock: false,
      shift: false,
      alt: false,
      shiftLeft: false,
      altLeft: false,
    },

    init() {
      this.elements.main = document.querySelector('.keyboard');

      this.elements.main.appendChild(this._createKeys());

      this.elements.keys = this.elements.main.querySelectorAll('.keyboard__key_letter');

      document.querySelector('.main__textarea').addEventListener('input', (element) => {
        this.properties.value = element.target.value;
      });
    },

    _createKeys() {
      const fragment = document.createDocumentFragment();
      const keyLayout = Alphabets.rus;

      keyLayout.forEach(key => {
        const keyElement = document.createElement('button');

        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('down', 'keyboard__key');

        switch (key) {
          case 'Tab':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_tab');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              this._pressTab();
            });
            break;
          case 'Backspace':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_backspace');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
              this._triggerEvent('oninput');
            });
            break;

          case 'Caps':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_caps', 'keyboard__key_active');
            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {
              this._toogleCaplsLock();
              keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
            });
            break;

          case 'Enter':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_enter');
            keyElement.textContent += key;
            keyElement.addEventListener('click', () => {
              this.properties.value += '\n';
              this._triggerEvent('oninput');
            });
            break;

          case 'Space':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_space');
            keyElement.addEventListener('click', () => {
              this.properties.value += ' ';
              this._triggerEvent('oninput');
            });
            break;

          case 'Shift':
            keyElement.classList.add('keyboard__key_special', 'keyboard__key_shift');

            keyElement.textContent += key;

            keyElement.addEventListener('click', () => {
              keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
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

            keyElement.textContent = key.toLowerCase();
            keyElement.classList.add('keyboard__key_letter');

            keyElement.addEventListener('click', () => {
              this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
              this.print();

            });
            break;
        }

        fragment.appendChild(keyElement);

      });

      return fragment;
    },

    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == 'function') {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },

    print() {
      document.querySelector('.main__textarea').value = this.properties.value;
    },

    _toogleCaplsLock() {
      this.properties.capsLock = !this.properties.capsLock;

      for (const key of this.elements.keys) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    },

    _toogleShift() {
      console.log('Shift');
    },

    _changeLanguage() {
      console.log('Languag changed');
    },

    _pressTab() {
      console.log('Tab');
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    Keyboard.init();
  });
}

