# 🍩 Simpsonspedia

An interactive web encyclopedia of The Simpsons universe. Explore characters, episodes, and iconic locations from Springfield.

## ✨ Features

- **Characters**: Discover detailed information about all The Simpsons characters
- **Episodes**: Browse through the extensive collection of series episodes
- **Locations**: Explore the most iconic places like Moe's Tavern, Springfield Elementary School, and more
- **Search**: Quickly find any character, episode, or location
- **Modern UI**: Responsive and attractive design built with modern components

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <REPOSITORY_URL>
cd simpsonspedia
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application for production
- `npm run build:dev` - Build the application in development mode
- `npm run preview` - Preview the production build
- `npm run lint` - Run the linter to check the code

## 🛠️ Technologies Used

This project is built with the following technologies:

- **Vite** - Ultra-fast build tool and development server
- **React** - JavaScript library for building user interfaces
- **TypeScript** - JavaScript superset with static typing
- **React Router** - Routing for React applications
- **TanStack Query** - Server state management and caching
- **shadcn/ui** - Accessible and customizable UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible primitive components
- **Lucide React** - Modern and beautiful icons

## 📁 Project Structure

```
simpsonspedia/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   │   ├── ui/      # Base UI components (shadcn/ui)
│   │   └── ...      # App-specific components
│   ├── hooks/       # Custom hooks
│   ├── lib/         # Utilities and helpers
│   ├── pages/       # Application pages
│   ├── App.tsx      # Main component
│   └── main.tsx     # Entry point
├── package.json
└── README.md
```

## 🎨 Customization

The project uses customizable CSS variables for theming. You can modify colors and styles in:

- `src/index.css` - CSS variables and global styles
- `tailwind.config.ts` - Tailwind CSS configuration

## 📦 Deployment

### Production Build

```bash
npm run build
```

This will generate a `dist` folder with optimized files ready to deploy.

### Deployment Options

You can deploy this application on any platform that supports static applications:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **Cloudflare Pages**: Connect your repository for automatic deployments

## 🤝 Contributing

Contributions are welcome. Feel free to:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- The Simpsons™ and all related characters are property of 20th Century Fox
- This project is a fan creation with no official affiliation

---

Made with 💛 by The Simpsons fans
