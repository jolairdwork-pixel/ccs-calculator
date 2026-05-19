import CCSCalculator from './CCSCalculator';

export default function App() {
  return (
    <>
      <CCSCalculator />
      <div style={{
        textAlign: 'center',
        padding: '16px 20px 32px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        color: '#aaa'
      }}>
        A free tool by{' '}
        <a
          href="https://www.instagram.com/itssojo_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#d4af82', textDecoration: 'none' }}
        >
          @itssojo_
        </a>
        {' '}· Estimates only · 2025–26 rates
      </div>
    </>
  );
}
