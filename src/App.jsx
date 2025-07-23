import { useState } from 'react';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';
import Chat from './components/Chat';

export default function App() {
  const [transcript, setTranscript] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <main className="p-4 max-w-4xl mx-auto">
        <VideoPlayer onTranscriptReady={setTranscript} />
        {transcript && <Chat transcript={transcript} />}
      </main>
    </div>
  );
}
