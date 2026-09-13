import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navItems = ['Home', 'Technologies', 'Projects', 'About', 'Contact'];

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/technologies.json')
      .then((response) => response.json())
      .then(setTechnologies)
      .catch(() => toast.error('We could not load technologies.'))
      .finally(() => setIsLoading(false));
  }, []);

  const selectedIds = useMemo(() => new Set(stack.map((item) => item.id)), [stack]);
  const addToStack = (technology) => {
    if (selectedIds.has(technology.id)) return toast.warn(`${technology.name} is already in your stack.`);
    setStack((current) => [...current, technology]);
    toast.success(`${technology.name} added to your stack!`);
  };
  const removeFromStack = (technology) => {
    setStack((current) => current.filter((item) => item.id !== technology.id));
    toast.info(`${technology.name} removed.`);
  };
  const clearStack = () => {
    if (!stack.length) return;
    setStack([]);
    toast.info('Your stack has been cleared.');
  };

  return <>
    <header className="nav-shell">
      <nav className="navbar container">
        <button className="menu-button" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span><span></span></button>
        <a href="#home" className="brand"><img src="/assets/logo-text.png" alt="Dev Stack" /><span>Dev <b>Stack</b></span></a>
        <div className={menuOpen ? 'nav-links open' : 'nav-links'}>{navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}</div>
        <div className="account-actions"><button className="sign-in">Sign In</button><button className="sign-up">Sign Up</button></div>
      </nav>
    </header>
    <main>
      <section id="home" className="hero container">
        <div className="hero-copy"><p className="eyebrow">YOUR DEVELOPER TOOLKIT</p><h1>Build Your Ideal<br /><span>Development Stack</span></h1><p className="hero-text">Discover the tools, languages, and frameworks that fit the way you create. Build a stack that turns your next big idea into reality.</p><div className="hero-actions"><a className="primary-button" href="#technologies">Explore Technologies <span>→</span></a><a className="secondary-button" href="#about">Learn More</a></div></div>
        <div className="hero-art"><div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div><img src="/assets/banner-stack.png" alt="Colorful developer technology stack illustration" /></div>
      </section>
      <section id="technologies" className="technologies container"><div className="section-heading"><p className="eyebrow">CURATE YOUR TOOLBOX</p><h2>Explore the <span>Technologies</span></h2><p>Pick the technologies that power your perfect development workflow.</p></div>
        <div className="content-layout"><div className="catalog">{isLoading ? <div className="loading"><i></i> Loading technologies…</div> : technologies.map((technology) => <TechCard key={technology.id} technology={technology} added={selectedIds.has(technology.id)} onAdd={addToStack} />)}</div><StackPanel stack={stack} onRemove={removeFromStack} onClear={clearStack} /></div>
      </section>
    </main>
    <Footer />
    <ToastContainer position="bottom-right" autoClose={2400} theme="light" />
  </>;
}

function TechCard({ technology, added, onAdd }) { return <article className="tech-card"><div className="card-top"><div className="tech-icon"><img src={technology.icon} alt="" /></div><span className="badge">{technology.badge}</span></div><h3>{technology.name}</h3><p>{technology.description}</p><div className="card-meta"><span className="category">{technology.category}</span><span className="difficulty">{technology.difficulty}</span></div><div className="card-bottom"><span className="rating">★ <b>{technology.rating}</b></span><button className={added ? 'added' : ''} onClick={() => onAdd(technology)} disabled={added}>{added ? '✓ Added to Stack' : '+ Add to Stack'}</button></div></article>; }
function StackPanel({ stack, onRemove, onClear }) { return <aside className="stack-panel"><div className="stack-title"><div><p className="eyebrow">YOUR STACK</p><h2>Build it <span>your way.</span></h2></div>{stack.length > 0 && <button className="remove-all" onClick={onClear}>Remove all</button>}</div><p className="selected-count">{stack.length} {stack.length === 1 ? 'Technology' : 'Technologies'} Selected</p>{stack.length === 0 ? <div className="empty-stack"><div>＋</div><h3>Your stack is empty</h3><p>Add technologies to start building your ideal development stack.</p></div> : <div className="stack-items">{stack.map((item) => <div className="stack-item" key={item.id}><img src={item.icon} alt="" /><div><h3>{item.name}</h3><span>{item.category}</span></div><button onClick={() => onRemove(item)} aria-label={`Remove ${item.name}`}>×</button></div>)}</div>}<div className="stack-hint">{stack.length ? 'Your stack is looking great!' : 'Start by adding a technology you love.'}</div></aside>; }
function Footer() { return <footer id="about"><div className="footer-main container"><div className="footer-brand"><a href="#home" className="brand"><img src="/assets/logo-text.png" alt="Dev Stack" /><span>Dev <b>Stack</b></span></a><p>Helping developers discover the tools they need to create exceptional things.</p><div className="socials"><a href="#github">GH</a><a href="#twitter">𝕏</a><a href="#linkedin">in</a></div></div>{[['Product','Technologies','Stack Builder','Roadmap'],['Company','About us','Blog','Careers'],['Legal','Privacy policy','Terms of service']].map(([title,...links]) => <div className="footer-links" key={title}><h3>{title}</h3>{links.map((link) => <a href={`#${link}`} key={link}>{link}</a>)}</div>)}</div><div className="footer-bottom container"><span>© 2026 Dev Stack. Built for developers, by developers.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div></footer>; }
export default App;
