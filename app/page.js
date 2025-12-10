import Navbar from './components/Navbar';
import Link from 'next/link';
import { ArrowRight, Wrench, Zap } from 'lucide-react';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <main style={{ background: '#000' }}>
      <Navbar />

      {/* SEARCH BAR SECTION */}
      <SearchBar />

      {/* Hero Section */}

      {/* Hero Section */}
      <section className="container hero-section error-glitch">

        {/* Left: Text Content */}
        <div className="hero-text">
          <h1 className="animate-fade-in" style={{ fontSize: '5rem', letterSpacing: '2px', marginBottom: '1rem', lineHeight: '1.1' }}>
            WHERE <span className="text-red">POWER</span> MEETS <span className="text-red">ART</span>
          </h1>
          <p className="animate-fade-in" style={{
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '2rem',
            color: '#888',
            animationDelay: '0.2s',
            maxWidth: '500px'
          }}>
            Piston Rental-X Pro makes it easy to rent and mod professional supercars.
            <br /><br />
            <span style={{ color: '#aaa', fontStyle: 'italic' }}>
              If you only ride machines with engines — this is your place — but you came here expecting electric cars, then you don’t have permission for that here.
            </span>
          </p>

          <div className="animate-fade-in" style={{
            marginBottom: '2rem',
            color: '#ccc',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            fontStyle: 'italic',
            borderLeft: '2px solid #dc143c',
            paddingLeft: '1rem',
            animationDelay: '0.25s'
          }}>
            "RIDE CALLED<br />
            WHILE ON THIS<br />
            'life'<br />
            YOU<br />
            HAVE TO TAKE THE GOOD<br />
            WITH THE BAD, SMILE<br />
            WHEN<br />
            YOU'RE<br />
            SAD<br />
            LOVE<br />
            WHAT YOU HAD.<br />
            ALWAYS FORGIVE,<br />
            BUT NEVER FORGET.<br />
            LEARN FROM<br />
            YOUR MISTAKES,<br />
            BUT<br />
            NEVER REGRET.<br />
            PEOPLE CHANGE,<br />
            THINGS GO WRONG<br />
            JUST REMEMBER,<br />
            THE RIDE GOES ON."
          </div>

          <Link href="/products/car" className="btn btn-primary animate-fade-in" style={{ animationDelay: '0.2s', fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Rent Now
          </Link>
        </div>

        {/* Right: Image Card */}
        <div className="hero-image-container animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="hero-card">
            <img src="https://i.pinimg.com/736x/f2/67/f4/f267f496e85ae31702acdd25de194b0b.jpg" alt="Nissan GTR Modified" />
            <div style={{ padding: '1rem', background: '#111', borderTop: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>Nissan GTR R35</span>
                <span className="text-red" style={{ fontWeight: 'bold' }}>₹7000 / per hour</span>
              </div>
            </div>
          </div>

          {/* New Stacked Card: Kawasaki */}
          <div className="hero-card" style={{ marginTop: '2rem' }}>
            <img src="https://i.pinimg.com/1200x/c8/df/86/c8df862ab23a95c689f60b93c45f3d99.jpg" alt="Kawasaki Ninja H2R" />
            <div style={{ padding: '1rem', background: '#111', borderTop: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>Kawasaki Ninja H2R</span>
                <span className="text-red" style={{ fontWeight: 'bold' }}>₹6500 / per hour</span>
              </div>
            </div>
          </div>

          <div className="hero-card" style={{ marginTop: '2rem' }}>
            <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072" alt="OG Spares" />
            <div style={{ padding: '1rem', background: '#111', borderTop: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>OG Spares (Cars & Bikes)</span>
                <span className="text-red" style={{ fontWeight: 'bold' }}>Original</span>
              </div>
            </div>
          </div>

          {/* New Stacked Card: Mod Kits */}
          <div className="hero-card" style={{ marginTop: '2rem' }}>
            <img src="https://i.pinimg.com/1200x/c2/82/85/c28285f40d5116d698387f5dbcadab4e.jpg" alt="Modification Kits" />
            <div style={{ padding: '1rem', background: '#111', borderTop: '1px solid #333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 'bold' }}>Mod Kits (Full Custom)</span>
                <span className="text-red" style={{ fontWeight: 'bold' }}>Premium</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 1. Super Car Collections */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ height: '2px', background: 'var(--primary)', flex: 1 }}></div>
          <h2>SUPER CAR <span className="text-red">COLLECTIONS</span></h2>
          <div style={{ height: '2px', background: 'var(--primary)', flex: 1 }}></div>
        </div>

        <div className="grid">
          {/* Showcase Card 1 */}
          <Link href="/products/car" className="card" style={{ textDecoration: 'none' }}>
            <div style={{ height: '300px', background: 'url(https://i.pinimg.com/736x/f2/67/f4/f267f496e85ae31702acdd25de194b0b.jpg) center/cover' }}>
              <div style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)', height: '100%', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>GTR R35 MODIFIED</h3>
              </div>
            </div>
          </Link>
          {/* Showcase Card 2 */}
          <Link href="/products/car" className="card" style={{ textDecoration: 'none' }}>
            <div style={{ height: '300px', background: 'url(https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070) center/cover' }}>
              <div style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)', height: '100%', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>FERRARI SF90</h3>
              </div>
            </div>
          </Link>
          <Link href="/products/car" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#111',
            border: '1px dashed #333',
            color: '#fff',
            fontSize: '1.5rem',
            textTransform: 'uppercase'
          }}>
            View All Cars <ArrowRight style={{ marginLeft: '1rem' }} />
          </Link>
        </div>
      </section>

      {/* 2. Super Bikes Collections */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ height: '2px', background: '#333', flex: 1 }}></div>
          <h2>SUPER BIKES <span className="text-red">COLLECTIONS</span></h2>
          <div style={{ height: '2px', background: '#333', flex: 1 }}></div>
        </div>

        <div className="grid">
          <Link href="/products/bike" className="card">
            <div style={{ height: '300px', background: 'url(https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070) center/cover' }}>
              <div style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)', height: '100%', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>DUCATI V4 R</h3>
              </div>
            </div>
          </Link>
          <Link href="/products/bike" className="card">
            <div style={{ height: '300px', background: 'url(https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=2069) center/cover' }}>
              <div style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)', height: '100%', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#fff' }}>NINJA H2R</h3>
              </div>
            </div>
          </Link>
          <Link href="/products/bike" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', border: '1px dashed #333', color: '#fff', fontSize: '1.5rem', textTransform: 'uppercase' }}>
            View All Bikes <ArrowRight style={{ marginLeft: '1rem' }} />
          </Link>
        </div>
      </section>

      {/* 3. OG Spare Parts (Distinct Feature) */}
      <section style={{ background: '#050000', padding: '4rem 0', borderTop: '1px solid #330000', borderBottom: '1px solid #330000', marginBottom: '6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '4rem', marginBottom: '0.5rem', border: 'none' }}>OG <span className="text-red">SPARES</span></h2>
              <p style={{ color: '#666', letterSpacing: '2px' }}>A-Z COLLECTION | ORIGINAL IMPORTS | RARE FINDS</p>
            </div>
            <Zap size={48} color="#dc143c" />
          </div>

          {/* Pinterest Style Animated Grid Simulation */}
          <Link href="/spares" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              opacity: 0.8,
              transition: 'all 0.1s',
              cursor: 'pointer',
              transform: 'skewX(-2deg)'
            }}
              className="hover-bright"
            >
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500) center/cover', border: '1px solid #333' }}></div>
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500) center/cover', border: '1px solid #333' }}></div>
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500) center/cover', border: '1px solid #333' }}></div>
              <div style={{ height: '200px', background: 'url(https://images.unsplash.com/photo-1503376763036-066120622c74?w=500) center/cover', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#dc143c' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ENTER PORTAL &rarr;</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Modification Kits */}
      <section className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Wrench size={40} color="#dc143c" style={{ marginBottom: '1rem' }} />
          <h2 style={{ border: 'none' }}>MODIFICATION <span className="text-red">KITS</span></h2>
          <p className="text-muted">FROM ALTO TO AVENTADOR - WE MODIFY EVERYTHING</p>
        </div>

        <div className="grid">
          <Link href="/products/kit" className="card">
            <div style={{ height: '250px', background: 'url(https://images.unsplash.com/photo-1603584173870-7b23111e1f7d?q=80&w=2071) center/cover' }}></div>
            <div style={{ padding: '1.5rem' }}>
              <h3>BODY KITS</h3>
              <p className="text-muted">Widebody, Carbon Fiber, Aero</p>
            </div>
          </Link>
          <Link href="/products/kit" className="card">
            <div style={{ height: '250px', background: 'url(https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070) center/cover' }}></div>
            <div style={{ padding: '1.5rem' }}>
              <h3>PERFORMANCE</h3>
              <p className="text-muted">Turbos, ECUs, Exhausts</p>
            </div>
          </Link>
          <Link href="/products/kit" className="card">
            <div style={{ height: '250px', background: 'url(https://images.unsplash.com/photo-1552168324-d612d7772f13?q=80&w=2056) center/cover' }}></div>
            <div style={{ padding: '1.5rem' }}>
              <h3>INTERIORS</h3>
              <p className="text-muted">Alcantara, Racing Seats, Roll Cages</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #222', padding: '4rem 0', textAlign: 'center', color: '#444' }}>
        <p>&copy; 2024 RENTAL X PRO. THE REDLINE EXPERIENCE.</p>
      </footer>
    </main >
  );
}
