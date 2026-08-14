# Joseph A Maurer - Software Engineer Portfolio

A modern, responsive portfolio website showcasing software engineering projects and skills.

## 🚀 Features

- **Modern Build System**: Vite for fast development and optimized builds
- **Progressive Web App**: Installable with offline capabilities
- **Performance Optimized**: Image optimization, code splitting, and compression
- **Responsive Design**: Works perfectly on all devices
- **Interactive Backgrounds**: Dynamic Vanta.js animations
- **Blog Integration**: Medium RSS feed integration
- **Project Showcase**: Detailed project breakdowns with live demos

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite
- **Styling**: Bootstrap 5, SCSS
- **Animations**: Vanta.js, CSS animations
- **Icons**: Font Awesome
- **Fonts**: Google Fonts, Titillium Web, Fira Code

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maurerpower12/JosephAMaurerResumeWebsite.git
   cd JosephAMaurerResumeWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Optimization
npm run optimize-images  # Optimize images and generate WebP
npm run analyze      # Analyze bundle size
```

## 📁 Project Structure

```
├── index.html              # Main entry point
├── css/                    # Compiled CSS files
├── scss/                   # SCSS source files
├── js/                     # JavaScript modules
│   ├── modules/           # ES6 modules
│   ├── TerminalBoot/      # Terminal animation
│   └── Vanta/            # Background effects
├── img/                   # Images and assets
├── components/            # Reusable HTML components
├── Projects/             # Project showcase pages
├── vendor/               # Third-party libraries
└── scripts/              # Build and optimization scripts
```

## 🎨 Customization

### Colors
Update the CSS custom properties in `css/resume.css`:
```css
:root {
  --gold-accent-color: #e4b861;
  --red-accent-color: #9e0404ce;
  --map-color: rgb(51,51,51);
}
```

### Background Effects
Modify the background effects in `js/modules/background-effects.js`

### Projects
Add new projects by:
1. Adding project images to `img/`
2. Creating project HTML files in `Projects/`
3. Adding project cards to `index.html`

## 📱 PWA Features

- **Offline Support**: Caches essential resources
- **Installable**: Can be installed as a native app
- **Fast Loading**: Optimized assets and caching strategies

## 🔧 Performance Optimizations

- **Image Optimization**: Automatic WebP conversion and compression
- **Code Splitting**: Vendor and feature-based chunking
- **Compression**: Gzip and Brotli compression
- **Caching**: Strategic caching for fonts and static assets
- **Lazy Loading**: Images load as needed

## 🚀 Deployment

### GitHub Pages
1. Push to main branch
2. GitHub Actions will automatically build and deploy

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your web server
```

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Contact

- **Email**: contact@josephamaurer.com
- **LinkedIn**: [Joseph Maurer](https://www.linkedin.com/in/josephamaurer/)
- **GitHub**: [maurerpower12](https://github.com/maurerpower12)
- **Blog**: [Medium](https://medium.com/@josephamaurer) 

