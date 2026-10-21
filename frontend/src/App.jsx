
import { useState } from "react";
import Navbar from "./components/Navbar";
import BidForm from "./components/BidForm";
import "./App.css";

const projects = [
  {
    id: "BW-101",
    title: "Residential Building Construction",
    location: "Hyderabad, Telangana",
    budget: "₹25–35 Lakhs",
    deadline: "20 Oct 2026",
    category: "Residential",
    bids: 4,
    status: "Open",
  },
  {
    id: "BW-102",
    title: "Commercial Office Renovation",
    location: "Vijayawada, Andhra Pradesh",
    budget: "₹10–18 Lakhs",
    deadline: "24 Oct 2026",
    category: "Commercial",
    bids: 2,
    status: "Open",
  },
  {
    id: "BW-103",
    title: "Independent House Construction",
    location: "Guntur, Andhra Pradesh",
    budget: "₹18–28 Lakhs",
    deadline: "28 Oct 2026",
    category: "Residential",
    bids: 6,
    status: "Closing Soon",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidProject, setBidProject] = useState(null);

  async function handleBidSubmit(bidData) {
    try {
      const response = await fetch("http://localhost:5000/api/quotations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: bidData.projectId,
          amount: bidData.amount,
          duration: bidData.duration,
          description: bidData.description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to submit quotation.");
        return;
      }

      alert(result.message);
      setBidProject(null);
    } catch (error) {
      console.error("Quotation submission failed:", error);
      alert("Cannot connect to the backend. Please check your server.");
    }
  }

  const filteredProjects = projects.filter((project) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(searchText) ||
      project.location.toLowerCase().includes(searchText) ||
      project.id.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || project.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalBids = projects.reduce(
    (total, project) => total + project.bids,
    0
  );

  const openProjects = projects.filter(
    (project) => project.status === "Open"
  ).length;

  return (
    <>
      <Navbar />

      <main className="app">
        <section className="dashboard-hero">
          <div className="hero-content">
            <span className="eyebrow">BID MANAGEMENT WORKSPACE</span>

            <h1>Find Projects. Submit Bids. Build Trust.</h1>

            <p>
              Discover construction opportunities, manage quotations,
              and keep every bid organized in one place.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-action">
                Explore Projects
              </a>

              <a href="#how-it-works" className="secondary-action">
                How It Works
              </a>
            </div>
          </div>

          <div className="hero-summary">
            <div className="summary-icon">BW</div>
            <p className="summary-label">Your bidding workspace</p>
            <h2>BuildWise</h2>

            <p className="summary-description">
              A clearer way to connect construction owners and builders.
            </p>

            <div className="summary-footer">
              <span className="status-dot" />
              Opportunities at a glance
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Dashboard overview">
          <article className="stat-card">
            <span className="stat-icon blue-icon">▦</span>
            <p>Available Projects</p>
            <h2>{projects.length}</h2>
            <span className="stat-note">Sample opportunities</span>
          </article>

          <article className="stat-card">
            <span className="stat-icon amber-icon">₹</span>
            <p>Total Quotations</p>
            <h2>{totalBids}</h2>
            <span className="stat-note">Across sample projects</span>
          </article>

          <article className="stat-card">
            <span className="stat-icon green-icon">✓</span>
            <p>Open Projects</p>
            <h2>{openProjects}</h2>
            <span className="stat-note">Open in this demo</span>
          </article>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OPPORTUNITIES</span>
              <h2>Construction Projects</h2>
              <p>Explore projects and review their bidding details.</p>
            </div>

            <span className="project-count">
              {filteredProjects.length} projects
            </span>
          </div>

          <div className="project-toolbar">
            <div className="search-box">
              <span aria-hidden="true">⌕</span>

              <input
                type="search"
                placeholder="Search projects or locations..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search projects"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by project category"
            >
              <option value="All">All Categories</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="project-list">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-top">
                  <span className="project-id">{project.id}</span>

                  <span
                    className={`project-status ${project.status === "Closing Soon"
                      ? "closing-soon"
                      : ""
                      } `}
                  >
                    {project.status}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-location">
                  <span aria-hidden="true">⌖</span> {project.location}
                </p>

                <div className="project-details">
                  <div>
                    <span>Estimated Budget</span>
                    <strong>{project.budget}</strong>
                  </div>

                  <div>
                    <span>Bid Deadline</span>
                    <strong>{project.deadline}</strong>
                  </div>

                  <div>
                    <span>Quotations</span>
                    <strong>{project.bids} submitted</strong>
                  </div>
                </div>

                <div className="project-card-bottom">
                  <span className="category-tag">{project.category}</span>

                  <button
                    type="button"
                    className="details-button"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}

            {filteredProjects.length === 0 && (
              <div className="empty-state">
                <h3>No projects found</h3>
                <p>
                  Try another search term or choose a different category.
                </p>

                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SIMPLE WORKFLOW</span>
              <h2>How BuildWise Works</h2>
              <p>A structured bidding journey for owners and builders.</p>
            </div>
          </div>

          <div className="workflow-grid">
            <article className="workflow-card">
              <span>01</span>
              <h3>Discover Projects</h3>
              <p>
                Builders browse project opportunities and review requirements.
              </p>
            </article>

            <article className="workflow-card">
              <span>02</span>
              <h3>Submit Quotations</h3>
              <p>
                Builders prepare their pricing, timelines, and bid details.
              </p>
            </article>

            <article className="workflow-card">
              <span>03</span>
              <h3>Review and Compare</h3>
              <p>
                Owners evaluate quotations and communicate before making
                a decision.
              </p>
            </article>
          </div>
        </section>

        <footer className="app-footer" id="about">
          <div className="logo-text">
            Build<span>Wise</span>
          </div>

          <p>Build Smarter. Bid Better.</p>
          <span>Construction opportunities, organized.</span>
        </footer>
      </main>

      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >

            </button>

            <span className="eyebrow">{selectedProject.id}</span>
            <h2 id="modal-title">{selectedProject.title}</h2>
            <p className="project-location">
              {selectedProject.location}
            </p>

            <div className="modal-details">
              <p>
                <span>Category</span>
                <strong>{selectedProject.category}</strong>
              </p>

              <p>
                <span>Estimated Budget</span>
                <strong>{selectedProject.budget}</strong>
              </p>

              <p>
                <span>Bid Deadline</span>
                <strong>{selectedProject.deadline}</strong>
              </p>

              <p>
                <span>Quotations Received</span>
                <strong>{selectedProject.bids}</strong>
              </p>
            </div>

            <p className="demo-notice">
              This is demonstration data. Live project information and
              quotation submission still need backend integration.
            </p>
            <button
              type="button"
              className="primary-action modal-action"
              onClick={() => {
                setBidProject(selectedProject);
                setSelectedProject(null);
              }}
            >
              Submit a Bid
            </button>

            <button
              type="button"
              className="secondary-action modal-action"
              onClick={() => setSelectedProject(null)}
            >
              Close Details
            </button>
          </section>
        </div>
      )}

      {bidProject && (
        <BidForm
          project={bidProject}
          onClose={() => setBidProject(null)}
          onSubmit={handleBidSubmit}
        />
      )}
    </>
  );
}

export default App;
