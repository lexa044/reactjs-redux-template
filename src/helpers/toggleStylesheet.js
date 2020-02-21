function detachStylesheets() {
    Array.from(document.getElementsByClassName('theme-stylesheet')).forEach(style => {
      style.remove();
    });
  }
  
  function insertStylesheet({ isRTL, isDark }) {
    const link = document.createElement('link');
    link.href = `${process.env.PUBLIC_URL}/css/theme${isDark ? '-dark' : ''}${isRTL ? '-rtl' : ''}.css`;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.className = 'theme-stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('html')[0].setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }
  
  export default ({ isRTL, isDark }) => {
    detachStylesheets();
    insertStylesheet({ isRTL, isDark });
  };
  