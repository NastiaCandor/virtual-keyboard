export default function createShell() {
  const header = document.createElement('header');
  const headerWrapper = document.createElement('div');
  const title = document.createElement('h1');

  header.className = 'header';
  headerWrapper.className = 'wrapper';

  title.className = 'header__title';
  title.innerHTML = 'Виртуальная клавиатура';

  headerWrapper.appendChild(title);
  header.appendChild(headerWrapper);

  const main = document.createElement('main');
  const wrapper = document.createElement('div');
  const textarea = document.createElement('textarea');

  textarea.className = 'main__textarea';
  wrapper.appendChild(textarea);

  const virtKey = document.createElement('div');
  virtKey.className = 'keyboard';
  virtKey.setAttribute('id', 'keyboard');

  wrapper.appendChild(virtKey);

  const info = document.createElement('section');
  const description = document.createElement('p');
  const language = document.createElement('p');

  info.className = 'info';
  wrapper.className = 'wrapper';
  description.className = 'info__description';
  language.className = 'info__language';
  description.innerHTML = 'Клавиатура создана в операционной системе Windows 11';
  language.innerHTML = 'Для переключения языка: левые <span>ctrl + shift</span>';

  info.appendChild(description);
  info.appendChild(language);

  wrapper.appendChild(info);

  main.appendChild(wrapper);

  document.body.appendChild(header);
  document.body.appendChild(main);
}
