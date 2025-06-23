export default function BasicTestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '40px', 
      backgroundColor: '#f0f0f0',
      perspective: '1000px' 
    }}>
      <h1 style={{ marginBottom: '40px', color: '#333' }}>
        Ultra Basic 3D Transform Test
      </h1>
      
      {/* Test 1: Pure CSS hover */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#666' }}>Test 1: CSS-only 3D hover</h2>
        <div 
          className="css-3d-test"
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#ff6b6b',
            margin: '20px',
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#4ecdc4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'transform 0.5s ease',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotateX(25deg) rotateY(25deg) translateZ(50px)';
            e.currentTarget.style.backgroundColor = '#ff6b6b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
            e.currentTarget.style.backgroundColor = '#4ecdc4';
          }}>
            Hover Test 1
          </div>
        </div>
      </div>

      {/* Test 2: Extreme transform values */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#666' }}>Test 2: Extreme 3D values</h2>
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#a8e6cf',
          margin: '20px',
          perspective: '500px',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          transition: 'all 1s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotateX(45deg) rotateY(45deg) translateZ(100px) scale(1.2)';
          e.currentTarget.style.backgroundColor = '#ff8b94';
          e.currentTarget.style.boxShadow = '0 50px 100px rgba(0,0,0,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
          e.currentTarget.style.backgroundColor = '#a8e6cf';
          e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        }}>
          Extreme 3D Test
        </div>
      </div>

      {/* Test 3: Check if ANY transform works */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#666' }}>Test 3: Basic 2D transform (fallback)</h2>
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#ffd93d',
          margin: '20px',
          cursor: 'pointer',
          transition: 'all 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#333',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.5) rotate(15deg)';
          e.currentTarget.style.backgroundColor = '#6c5ce7';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.backgroundColor = '#ffd93d';
          e.currentTarget.style.color = '#333';
        }}>
          2D Transform Test
        </div>
      </div>

      {/* Browser Info */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '10px', color: '#333' }}>Browser Information:</h3>
        <p style={{ color: '#666', margin: '5px 0' }}>
          User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'Loading...'}
        </p>
        <p style={{ color: '#666', margin: '5px 0' }}>
          CSS 3D Transforms Support: {typeof window !== 'undefined' && 'CSS' in window && 'supports' in (window as any).CSS 
            ? (window as any).CSS.supports('transform-style', 'preserve-3d') ? 'YES' : 'NO'
            : 'Unknown'}
        </p>
      </div>
    </div>
  );
}