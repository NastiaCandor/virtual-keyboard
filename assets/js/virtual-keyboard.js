import createShell from './vk-shell';
import addKey from './add-key';
import setLanguage from './set-languages';
import trackKeys from './track-keys';

export default function virtualKeyboard() {
  createShell();
  addKey();
  setLanguage('eng');
  trackKeys();
}
