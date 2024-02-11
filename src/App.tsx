import { ChangeEvent, FormEvent, useState } from 'react';
{"userId":"number","id":"number","title":"string","body":"string"}

function App() {
  const user: User = {
    id: 0,
    email: 'pedro',
    first_name: 'losa',
    last_name: 'pla',
    avatar: 'kartossss',
  };

  console.log(user);

  const [jsonMessage, setJsonMessage] = useState('');
  const [result, setResult] = useState<null | object>(null);
  const [error, setError] = useState('');
  const [copy, setCopy] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const data = e.target.value;
    setJsonMessage(data);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parse = await JSON.parse(jsonMessage);
      const newResult: { [key: string]: string | string[] } = { ...result };
      Object.keys(parse).forEach((key) => {
        if (Array.isArray(parse[key])) {
          newResult[key] = 'string[] or object[]';
        } else {
          newResult[key] = typeof parse[key];
        }
      });

      setResult(newResult);
    } catch (error) {
      setError('Invalid JSON:' + error);
    }
  };

  const handleCopy = () => {
    if (copy) return;
    navigator.clipboard.writeText(JSON.stringify(result));
    setCopy('Copied!');
    setTimeout(() => {
      setCopy('');
    }, 2000);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <img src='json.ico' alt='json' className='img' />
          <button type='submit' className='btn'>
            Format
          </button>
        </div>
        <textarea name='json' id='json' onChange={handleChange}></textarea>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div className='resultContainer'>
          <div className='btn-container'>
            {copy && <p style={{ color: '#1ad298' }}>{copy}</p>}
            <button className='copy-btn' onClick={handleCopy}>
              <img src='copy.png' className='copy-img' alt='' />
            </button>
          </div>
          <code>
            <pre>
              <p className='interfaceTitle'>
                <span>interface</span> YourInterface{' '}
                <span style={{ color: '#ffe100' }}>{'{'}</span>
              </p>
              {Object.keys(result).map((key: string) => (
                <p className='interfaceBody'>
                  <span> {key}</span>:
                  <span style={{ color: '#1ad298', marginLeft: '10px' }}>
                    {result[key as keyof typeof result]};
                  </span>
                </p>
              ))}
              <span style={{ fontSize: '15px', color: '#ffe100' }}>{'}'} </span>
            </pre>
          </code>
        </div>
      )}

      <footer className='footer'>
        <p>
          by <span>Pedro Losas</span>
        </p>
      </footer>
    </main>
  );
}

export default App;
