import { Navbar } from '@blueprintjs/core';
import MemeGenerator from './components/MemeGenerator';

function App() {
  return (
    <div>
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>Meme Generator</Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
      </Navbar>

      <div>
        <MemeGenerator />
      </div>
      <Navbar
        style={{
          position: 'fixed',
          left: '0',
          bottom: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>
          Made with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          by{' '}
          <a href="https://github.com/lauri-lyytikainen" target="_blank">
            Lauri Lyytikäinen
          </a>
        </p>
      </Navbar>
    </div>
  );
}

export default App;
