# Social Media Analytics

This project is a React-based social media analytics frontend web application that provides real-time analytical insights. It consists of three main pages: **Top Users**, **Trending Posts**, and **Feed**. The application consumes specified test server APIs to retrieve and display data.

## Features

- **Top Users**: Displays the top five users with the highest number of posts.
- **Trending Posts**: Shows trending posts based on the maximum number of comments.
- **Feed**: Provides a real-time feed of posts.

## Technologies Used

- React
- TypeScript
- Axios for API calls
- Vite for development and build tooling
- CSS for styling

## Project Structure

```
social-media-analytics
├── public
│   ├── favicon.svg
│   └── index.html
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── contexts
│   ├── hooks
│   ├── pages
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── index.tsx
│   ├── routes.tsx
│   └── vite-env.d.ts
├── .eslintrc.json
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd social-media-analytics
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## API Endpoints

The application interacts with the following API endpoints:

- Users: `/api/users`
- Posts: `/api/posts`
- Comments: `/api/comments`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.