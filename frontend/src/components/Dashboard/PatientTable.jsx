
import {
  Pencil,
  Trash2,
  LogOut,
  Users,
} from "lucide-react";
import { formatDate, formatLabel } from "../../utils/formatters";

export default function PatientTable({
  patients,
  loading,
  onEdit,
  onDelete,
  onDischarge,
}) {
  if (loading) {
    return <div className="table-message">Loading patient records...</div>;
  }

  if (patients.length === 0) {
    return (
      <div className="empty-state">
        <Users size={36} />
        <h3>No patients found</h3>
        <p>Try changing your search or filters, or add a patient.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Age / Gender</th>
            <th>Ward</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Admission Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>
                <div className="patient-name">
                  <div className="patient-avatar">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong>{patient.name}</strong>
                    <span>Patient #{patient.id}</span>
                  </div>
                </div>
              </td>

              <td>
                {patient.age} / {formatLabel(patient.gender)}
              </td>

              <td>{formatLabel(patient.ward)}</td>

              <td>{formatLabel(patient.department)}</td>

              <td>{formatLabel(patient.doctor)}</td>

              <td>{formatDate(patient.admissionDate)}</td>

              <td>
                <span
                  className={`status-badge ${
                    patient.status === "ADMITTED"
                      ? "status-admitted"
                      : "status-discharged"
                  }`}
                >
                  {formatLabel(patient.status)}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="action-button edit"
                    onClick={() => onEdit(patient)}
                    title="Edit patient"
                  >
                    <Pencil size={16} />
                  </button>

                  {patient.status === "ADMITTED" && (
                    <button
                      type="button"
                      className="action-button discharge"
                      onClick={() => onDischarge(patient)}
                      title="Mark discharged"
                    >
                      <LogOut size={16} />
                    </button>
                  )}

                  <button
                    type="button"
                    className="action-button delete"
                    onClick={() => onDelete(patient)}
                    title="Delete patient"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
