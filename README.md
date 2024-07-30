# StreamSaga 🎥

StreamSaga is a live streaming platform developed with Next.js, React.js, Prisma, MongoDB, TypeScript, Ngrok, Livekit, and Clerk. It features real-time chat, viewer counts, stream status updates, and participant management, offering a robust environment for live streaming and audience engagement.

## Features

- Live Streaming: 📹 High-quality live streaming capabilities using Livekit.
- Real-Time Chat: 💬 Interactive chat with moderation features like slow chat mode, followers-only chat, and the ability to enable/disable chat.
- Viewer Counts: 👁 Real-time display of viewer counts for active streams.
- Stream Status Updates: ⏳ Continuous updates on the status of ongoing streams.
- Participant Management: 🧑‍🤝‍🧑 Efficient management of stream participants.
- User Authentication: 🔐 Secure user authentication and management using Clerk.
- Follow/Following System: 🔄 Comprehensive system to facilitate user interactions and engagement.

## Technologies Used

- Next.js: 🚀 A React framework for server-side rendering and static site generation.
- React.js: ⚛️ A JavaScript library for building user interfaces.
- Prisma: 🗃 An ORM for interacting with MongoDB.
- MongoDB: 📊 A NoSQL database used for storing application data.
- TypeScript: 🛠 A statically typed superset of JavaScript for better development experience and code quality.
- Ngrok: 🌐 A tool for exposing local servers to the internet, useful for testing and development.
- Livekit: 🎙 A platform for building real-time video and audio applications.
- Clerk: 🔑 A service for user authentication and management.

## Installation

To set up StreamSaga locally, follow these steps:

1. Clone the Repository:

    
    git clone https://github.com/aashish-cloud/streamsaga.git
    

2. Navigate to the Project Directory:

    
    cd streamsaga
    

3. Install Dependencies:

    
    npm install
    

4. Configure Environment Variables:

    Create a .env.local file in the root directory of the project and add the following environment variables:

    
    MONGODB_URI=your_mongodb_uri
    NEXTAUTH_URL=http://localhost:3000
    CLERK_API_KEY=your_clerk_api_key
    LIVEKIT_API_KEY=your_livekit_api_key
    LIVEKIT_API_SECRET=your_livekit_api_secret
    

    Replace the placeholder values with your actual credentials.

5. Run Migrations:

    
    npx prisma migrate dev
    

6. Start the Development Server:

    
    npm run dev
    

    The application should now be running at http://localhost:3000.

## Usage

- Live Streaming: 📹 Start or join a live stream using Livekit's capabilities.
- Real-Time Chat: 💬 Participate in or moderate the chat during a live stream with features like slow chat mode and followers-only chat.
- Viewer Counts: 👁 View real-time statistics on the number of viewers for active streams.
- Stream Management: ⏳ Monitor and manage stream status and participants.
- User Authentication: 🔐 Register, log in, and manage user accounts securely with Clerk.
- Follow/Following System: 🔄 Users can follow and interact with others to enhance engagement.

## Contributing

Contributions are welcome! If you'd like to contribute to StreamSaga, please fork the repository and submit a pull request. 
