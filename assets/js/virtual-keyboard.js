import createShell from './vk-shell';
import addKey from './add-key';
import setLanguage from './set-languages';
import trackKeys from './track-keys';

export default function virtualKeyboard() {
  // create html file for keyboard
  createShell();
  // create and set keys behaviour
  addKey();
  // set initial language for first launch
  setLanguage('eng');
  // track real key to light virtual keys, languages change
  trackKeys();
}
