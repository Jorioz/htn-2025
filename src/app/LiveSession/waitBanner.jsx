// WaitingBanner.jsx
export default function WaitingBanner({ visible }) {
    if (!visible) return null;

    return (
        <div style={bannerStyle}>
            Waiting for a connection…
        </div>
    );
}

/* ------ styles ------ */
const bannerStyle = {
    position: 'fixed',
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffeb3b',
    color: '#333',
    padding: '10px 18px',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,.15)',
    zIndex: 9999,
};
