import { useState, useEffect } from 'react';

export default function Chat({ transcript }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('🤖 Ask me anything from the video...');
  const [qa, setQa] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const { pipeline } = await window.transformers.load();
      const model = await pipeline('question-answering', 'Xenova/distilbert-base-cased-distilled-squad');
      setQa(model);
    }
    loadModel();
  }, []);

  const askAI = async () => {
    if (!question || !transcript) return;

    setResponse('🤖 Thinking...');
    const result = await qa({
      question,
      context: transcript.slice(0, 1000)
    });

    setResponse(result.answer);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Ask AI from Transcript</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 rounded bg-white dark:bg-gray-700"
          placeholder="Type your question..."
        />
        <button
          onClick={askAI}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}
