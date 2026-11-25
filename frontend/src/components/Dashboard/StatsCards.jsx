
import { Users, UserCheck, UserMinus, Activity } from "lucide-react";

export default function StatsCards({ patients }) {
  const total = patients.length;
  const admitted = patients.filter((p) => p.status === "ADMITTED").length;
  const discharged = patients.filter((p) => p.status === "DISCHARGED").length;

  const cards = [
    {
      label: "Total Patients",
      value: total,
      icon: Users,
      color: "blue",
      description: "All patient records",
    },
    {
      label: "Currently Admitted",
      value: admitted,
      icon: UserCheck,
      color: "green",
      description: "Active admissions",
    },
    {
      label: "Discharged",
      value: discharged,
      icon: UserMinus,
      color: "orange",
      description: "Completed admissions",
    },
    {
      label: "Departments",
      value: new Set(patients.map((p) => p.department)).size,
      icon: Activity,
      color: "purple",
      description: "Departments represented",
    },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article className="stat-card" key={card.label}>
            <div className={`stat-icon ${card.color}`}>
              <Icon size={22} />
            </div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
            <div className="stat-description">{card.description}</div>
          </article>
        );
      })}
    </section>
  );
}
