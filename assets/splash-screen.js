class BlackFridaySplashScreen extends HTMLElement {
  constructor() {
    super();
    this.splashScreen = this.querySelector('#BlackFridaySplashScreen');
    this.closeButton = this.querySelector('#BlackFridaySplashScreenClose');
    this.showOnlyOnce = this.dataset.showOnlyOnce === 'true';
    this.cookieName = 'blackFridaySplashScreenShown';

    this.init();
  }

  init() {
    if (this.showOnlyOnce && this.getCookie(this.cookieName)) {
      return;
    }

    this.showSplashScreen();
    this.closeButton.addEventListener('click', this.closeSplashScreen.bind(this));
  }

  showSplashScreen() {
    this.splashScreen.classList.add('active');
  }

  closeSplashScreen() {
    this.splashScreen.classList.remove('active');
    if (this.showOnlyOnce) {
      this.setCookie(this.cookieName, 'true', 1); // Set cookie for 1 day
    }
  }

  setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }

  getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

customElements.define('black-friday-splash-screen', BlackFridaySplashScreen);