
import {
  LayoutDashboard,
  Users,
  HeartPulse,
} from "lucide-react";

export default function Sidebar() {
  function navigate(event, id) {
    event.preventDefault();

    const target = document.getElementById(id);

    if (!target) return;

    window.history.replaceState(null, "", `#${id}`);

    const headerHeight =
      document.querySelector(".top-header")?.offsetHeight || 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight -
      15;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <HeartPulse size={25} />
        </div>

        <div>
          <h2>DScribe</h2>
          <span>Patient Care</span>
        </div>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        <a
          href="#dashboard"
          className="nav-link active"
          onClick={(e) => navigate(e, "dashboard")}
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </a>

        <a
          href="#patients"
          className="nav-link"
          onClick={(e) => navigate(e, "patients")}
        >
          <Users size={19} />
          <span>Patients</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">
          <HeartPulse size={18} />
        </div>

        <div>
          <strong>Patient Management</strong>
          <span>Hospital administration</span>
        </div>
      </div>
    </aside>
  );
}
