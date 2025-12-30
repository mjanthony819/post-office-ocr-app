# Contributing to Post Office OCR Address Scanner

First off, thank you for considering contributing to the Post Office OCR Address Scanner! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the JavaScript/CSS styleguides
* Include appropriate test cases
* End all files with a newline
* Avoid platform-dependent code

## Development Setup

1. Fork and clone the repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/post-office-ocr-app.git
   cd post-office-ocr-app
   ```

2. Create a new branch for your work
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes

4. Test your changes
   ```bash
   cd backend && npm test
   cd ../frontend && npm test
   ```

5. Commit your changes
   ```bash
   git commit -m "feat: Add your feature description"
   ```

6. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

7. Create a Pull Request with a clear title and description

## Styleguides

### JavaScript Styleguide

* Use semicolons
* 2 spaces for indentation
* Use const for variables that won't change
* Use let for variables that will change
* Avoid var
* Add comments for complex logic
* Use meaningful variable names

### CSS Styleguide

* Use 2 spaces for indentation
* Use kebab-case for class names
* Use mobile-first approach
* Avoid inline styles
* Use CSS variables for colors and common values

### Commit Message Styleguide

Use clear, descriptive commit messages:

* `feat: Add new feature`
* `fix: Fix bug in feature`
* `docs: Update documentation`
* `style: Format code`
* `refactor: Refactor code`
* `test: Add tests`
* `chore: Update dependencies`

## Project Structure

```
post-office-ocr-app/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js
│       └── api.js
├── backend/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── docs/
├── README.md
├── DEVELOPMENT.md
├── QUICK_START.md
├── CONTRIBUTING.md
└── LICENSE
```

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `question` - Further information is requested

## Recognition

Contributors will be recognized in:
* The README.md file
* Release notes
* Project documentation

## Questions?

Feel free to open an issue with the label `question` if you have any questions about contributing.

Thanks for contributing! 🎉
