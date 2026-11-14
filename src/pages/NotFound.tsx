import { Link } from 'react-router-dom';
import { LostArt } from '../components/Art';
import { ArrowRight } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty">
        <LostArt />
        <span className="kicker">// 404</span>
        <h1>This path doesn’t exist (yet).</h1>
        <p className="muted">The roadmap you’re looking for isn’t here. Let’s get you back on the map.</p>
        <Link to="/" className="btn btn-primary">
          Browse roadmaps <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
