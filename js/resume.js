/* Copyright (C) 2020 Joseph Maurer - All Rights Reserved */

import { type } from './TerminalBoot/terminal.js';
import { BackgroundEffects } from './modules/background-effects.js';

class PortfolioApp {
  constructor() {
    this.backgroundEffects = new BackgroundEffects();
    this.init();
  }

  init() {
    $(document).ready(() => {
      this.backgroundEffects.init();
      this.initializeTyping();
      this.loadComponents();
      this.setupBitmoji();
    });
  }

  initializeTyping() {
    type('Software Engineer');
  }

  loadComponents() {
    $('#NavBarComponent').load('components/navigation.html');
    $('#FooterComponent').load('components/footer.html');
    $('#BlogPostModal').load('components/blogPostModal.html');
  }

  setupBitmoji() {
    const bitmojiOptions = ['Wave.webp', 'Hey.webp', 'Peace.webp', 'Good.webp', 'Net.webp'];
    const randomBitmoji = this.getRandomItem(bitmojiOptions);
    $('#bitmoji').attr('src', `./img/Bitmoji/${randomBitmoji}`);
  }

  getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }
}

// Initialize the application
new PortfolioApp();