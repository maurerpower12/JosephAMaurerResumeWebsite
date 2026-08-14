export class BackgroundEffects {
  constructor() {
    this.numberOfEffects = 5;
    this.defaultBackgroundColor = 0x222222;
    this.goldAccentColor = 0xe4b861;
    this.redAccentColor = 9979487;
    this.backgroundElementId = '#home';
  }

  init() {
    const randomEffect = this.getRandomEffect();
    this.applyEffect(randomEffect);
  }

  getRandomEffect() {
    return Math.floor(Math.random() * this.numberOfEffects);
  }

  applyEffect(effectNumber) {
    const config = {
      el: this.backgroundElementId,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundColor: this.defaultBackgroundColor
    };

    switch (effectNumber) {
      case 0:
        VANTA.GLOBE({
          ...config,
          color: this.redAccentColor,
          color2: this.goldAccentColor,
          size: 1.20
        });
        break;
      case 1:
        VANTA.NET({
          ...config,
          scaleMobile: 0.5,
          color: 0x5c5c5c,
          points: 20.00,
          maxDistance: 14.00,
          spacing: 10.00,
          showDots: false
        });
        break;
      case 2:
        VANTA.DOTS({
          ...config,
          size: 4.70,
          spacing: 37.00,
          color2: this.redAccentColor,
          color: this.goldAccentColor
        });
        break;
      case 3:
        VANTA.WAVES({
          ...config,
          mouseControls: false,
          touchControls: false,
          color: this.defaultBackgroundColor,
          shininess: 40.00,
          waveHeight: 15.00,
          waveSpeed: 1.00,
          zoom: 1.00
        });
        break;
      default:
        VANTA.TOPOLOGY({
          ...config,
          mouseControls: false,
          touchControls: false,
          color: 0xacaca9
        });
        break;
    }
  }
} 