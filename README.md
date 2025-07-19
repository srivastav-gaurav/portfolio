# Gaurav Srivastava - Portfolio Website

A modern, responsive portfolio website showcasing my experience as a Python & DevOps Engineer at BaseSolve Informatics, specializing in genomics analytics platforms and CI/CD automation.

## 🚀 Live Demo

Visit the live portfolio: [Your GitHub Pages URL will be here]

## ✨ Features

- **Responsive Design**: Fully responsive across all devices
- **Interactive Timeline**: Experience timeline with dual roles (Python Developer → DevOps Engineer)
- **Project Showcase**: Filterable project gallery with detailed modals
- **Skills Section**: Categorized technical skills with modern UI
- **Contact Form**: Functional contact form with validation
- **Smooth Animations**: CSS animations and scroll-triggered effects
- **Modern UI/UX**: Clean, professional design with gradient themes

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Flexbox & Grid
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)
- **Animations**: CSS animations & Intersection Observer API
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # Resume, images, and other assets
    ├── resume.pdf      # Your resume PDF (add your own)
    └── resume-placeholder.md  # Instructions for resume setup
```

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Open locally**:
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (if you have live-server installed)
     npx live-server
     ```

3. **View in browser**:
   - Navigate to `http://localhost:8000`

## 🚀 GitHub Pages Deployment

### Method 1: Direct Upload (Current Setup)

1. **Create a new repository** on GitHub named `portfolio` or `your-username.github.io`

2. **Upload files**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

4. **Access your site**:
   - URL: `https://yourusername.github.io/portfolio`
   - Or: `https://yourusername.github.io` (if repo name is `yourusername.github.io`)

### Method 2: GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 📝 Customization

### Personal Information
Update the following in `index.html`:

1. **Name & Title**: Line 47-49
2. **About Section**: Lines 67-75
3. **Contact Info**: Lines 245-255
4. **Social Links**: Lines 257-267

### Projects
Modify `script.js` starting at line 87 to update project data with your own projects.

### Skills
Update the skills section in `index.html` starting at line 105.

### Experience Timeline
Modify the timeline section in `index.html` starting at line 87.

### Colors & Styling
Main color variables in `styles.css`:
- Primary: `#667eea`
- Secondary: `#764ba2`
- Dark: `#2c3e50`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎨 Design Features

- **Color Scheme**: Modern gradient theme with professional blues and purples
- **Typography**: Inter font family for clean, modern look
- **Layout**: CSS Grid and Flexbox for responsive design
- **Animations**: Smooth transitions and scroll-triggered animations
- **Interactive Elements**: Hover effects, modals, and filtering

## 🔄 Updates & Maintenance

### Adding New Projects

1. Update the HTML structure in the projects section
2. Add project data to the `projectData` object in `script.js`
3. Include appropriate filter categories

### Adding New Skills

1. Update the skills section in `index.html`
2. Follow the existing structure with icons and tags

### Updating Experience

1. Modify the timeline section in `index.html`
2. Ensure consistent styling with existing entries

## 🐛 Browser Support

- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: gaurav.srivastava@example.com
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]

---

Built with ❤️ by Gaurav Srivastava | © 2024 All Rights Reserved 