# AP Calculus Intelligent Textbook

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/calculus/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fcalculus-blue?logo=github)](https://github.com/dmccreary/calculus)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/calculus/](https://dmccreary.github.io/calculus/)

## Overview

This is an interactive, AI-generated intelligent textbook for **AP Calculus** designed for high school students seeking college credit. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, and over 100 interactive MicroSims (p5.js simulations) that make calculus come alive.

The textbook covers both AP Calculus AB and BC curricula with 23 comprehensive chapters spanning limits, derivatives, integrals, and their applications. The fun, encouraging tone—featuring **Delta**, a curious triangular robot mascot who explores the hills and valleys of mathematical curves—makes even challenging topics accessible and engaging.

Whether you're a student preparing for AP exams, an educator looking for interactive teaching resources, or a self-learner building calculus foundations, this textbook provides hands-on exploration with immediate visual feedback. All MicroSims use open-source JavaScript libraries and run directly in your browser—no special software required.

## Site Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 380 |
| Chapters | 23 |
| Markdown Files | 185 |
| Interactive MicroSims | 100 |
| Glossary Terms | 230 |
| FAQ Questions | 72 |
| Chapter Quizzes | 23 |

## Key Features

- **Learning Graph**: 380 calculus concepts with dependency relationships for optimal learning sequencing
- **Interactive MicroSims**: 100 p5.js simulations covering everything from limits to optimization
- **Delta the Robot**: A friendly mascot who makes abstract concepts tangible by "experiencing" calculus physically
- **Bloom's Taxonomy Alignment**: Content designed for higher-order thinking (Analyze, Evaluate, Create)
- **AP Exam Preparation**: Covers all topics for both AP Calculus AB and BC examinations
- **Open Source Tools Only**: Ensuring every student can participate regardless of economic situation

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/calculus.git
cd calculus
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
```

### Build and Serve Locally

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000/calculus/`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

## Repository Structure

```
calculus/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 23 chapter directories
│   │   ├── 01-foundations-of-calculus/
│   │   │   ├── index.md          # Chapter content
│   │   │   └── quiz.md           # Chapter quiz
│   │   └── ...
│   ├── sims/                      # 100 interactive p5.js MicroSims
│   │   ├── graph-viewer/         # Learning graph visualization
│   │   ├── secant-to-tangent/    # Derivative concept visualization
│   │   └── ...
│   ├── learning-graph/           # Learning graph data and analysis
│   │   ├── concept-list.md       # 380 concepts
│   │   └── quality-metrics.md    # Quality analysis
│   ├── appendices/               # Supporting materials
│   │   └── delta.md              # Meet Delta mascot
│   ├── glossary.md               # 230 ISO 11179-compliant definitions
│   ├── faq.md                    # 72 frequently asked questions
│   └── index.md                  # Home page
├── mkdocs.yml                    # MkDocs configuration
└── README.md                     # This file
```

## Chapter Overview

1. **Foundations of Calculus** - Functions, domains, transformations
2. **Understanding Limits** - Intuitive and graphical limits
3. **Evaluating Limits** - Algebraic techniques
4. **Continuity** - Types and conditions
5. **Asymptotes and End Behavior** - Function behavior at extremes
6. **The Derivative Concept** - Rates of change and tangent lines
7. **Differentiability** - When derivatives exist
8. **Basic Derivative Rules** - Power, constant, sum rules
9. **Product, Quotient, Transcendental** - Extended differentiation
10. **The Chain Rule** - Composite function derivatives
11. **Implicit Differentiation** - Derivatives of implicit relations
12. **Inverse Function Derivatives** - Derivatives of inverses
13. **Higher-Order Derivatives** - Motion and acceleration
14. **Related Rates** - Applied differentiation
15. **L'Hospital's Rule** - Indeterminate forms
16. **MVT and Extrema** - Optimization foundations
17. **Derivative Tests** - Classifying critical points
18. **Curve Sketching** - Complete function analysis
19. **Optimization** - Applied maxima and minima
20. **Basic Antiderivatives** - Introduction to integration
21. **Transcendental Integrals** - Exponential and logarithmic
22. **Riemann Sums and FTC** - The fundamental theorem
23. **Integral Properties** - Integration techniques

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/calculus/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [LICENSE.md](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[p5.js](https://p5js.org/)** - Creative coding library powering our MicroSims
- **[vis-network](https://visjs.org/)** - Network visualization for learning graphs
- **[MathJax](https://www.mathjax.org/)** - LaTeX equation rendering
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the educators and developers who contribute to making educational resources accessible and interactive.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
