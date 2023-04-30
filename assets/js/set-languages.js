export default function setLanguage(startLang) {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', startLang);
  }
}
