import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const features = [
    {
      title: "Paper Trading",
      description:
        "Practice trading with virtual funds and build confidence before entering real markets.",
      icon: "📈",
    },
    {
      title: "Portfolio Management",
      description:
        "Track holdings, monitor performance, and understand your investment allocation in one place.",
      icon: "💼",
    },
    {
      title: "Market Insights",
      description:
        "Explore clear market trends, stock movements, and data-driven insights for smarter decisions.",
      icon: "📊",
    },
    {
      title: "Secure Authentication",
      description:
        "Your account is protected with secure authentication designed for a dependable trading experience.",
      icon: "🔒",
    },
  ];

  const benefits = [
    {
      title: "Learn Without Risk",
      description:
        "Test strategies and understand market behavior without putting your real money at risk.",
    },
    {
      title: "Make Informed Decisions",
      description:
        "Keep your portfolio organized and use market insights to strengthen every trading decision.",
    },
    {
      title: "Built for Every Trader",
      description:
        "Whether you are starting out or refining a strategy, our platform keeps trading simple.",
    },
  ];

  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Smart investing starts here</span>

          <h1 className="hero-title">
            Trade Smarter with <span>Stock Trading App</span>
          </h1>

          <p className="hero-tagline">
            A modern platform for learning, tracking, and growing your trading
            confidence.
          </p>

          <p className="hero-description">
            Practice with paper trading, manage your portfolio, and discover
            meaningful market insights in one secure, easy-to-use experience.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="button button-primary">
              Get Started
            </Link>

            <Link to="/register" className="button button-secondary">
              Learn More
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="market-card">
            <div className="market-card-header">
              <span className="market-label">Portfolio Value</span>
              <span className="market-status">Live Demo</span>
            </div>

            <h2>$24,680.50</h2>

            <p className="market-growth">+12.48% this month</p>

            <div className="chart-bars">
              <span className="bar bar-one" />
              <span className="bar bar-two" />
              <span className="bar bar-three" />
              <span className="bar bar-four" />
              <span className="bar bar-five" />
              <span className="bar bar-six" />
              <span className="bar bar-seven" />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span className="section-label">Platform Features</span>

          <h2>Everything you need to trade with confidence</h2>

          <p>
            Explore practical tools designed to make your learning and trading
            journey more focused.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="section-heading">
          <span className="section-label">Why Choose Us</span>

          <h2>A better way to build trading confidence</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <article className="benefit-card" key={benefit.title}>
              <span className="benefit-number">0{index + 1}</span>

              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <span className="section-label">Start Today</span>

          <h2>Ready to practice your next winning strategy?</h2>

          <p>
            Start paper trading today and gain the confidence to make better
            market decisions tomorrow.
          </p>

          <Link to="/login" className="button button-primary">
            Start Paper Trading
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Stock Trading App</p>
      </footer>
    </main>
  );
}

export default Landing;
