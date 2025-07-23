import { useState } from 'react';
import { createWhisper } from 'whisper-wasm';

export default function VideoPlayer({ onTranscriptReady }) {
  const [videoFile, setVideoFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const transcribeVideo = async () => {
    if (!videoFile) return;
    setLoading(true);
    const whisper = await createWhisper();
    const { text } = await whisper.transcribe(videoFile);
    setTranscript(text);
    onTranscriptReady(text);
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Upload MP4 Video</h2>
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setVideoFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={transcribeVideo}
        disabled={!videoFile}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Transcribing...' : 'Transcribe Video'}
      </button>
      {transcript && (
        <p className="mt-4 whitespace-pre-wrap bg-black text-white p-2 rounded">
          {transcript.slice(0, 100)}...
        </p>
      )}
    </div>
  );
}
