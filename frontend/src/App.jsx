
import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import { patientApi } from "./services/patientApi";

import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import StatsCards from "./components/Dashboard/StatsCards";
import PatientTable from "./components/Dashboard/PatientTable";
import PatientFilters from "./components/Patients/PatientFilters";
import PatientForm from "./components/Patients/PatientForm";
import Modal from "./components/common/Modal";
import Toast from "./components/common/Toast";

import "./App.css";

const initialFilters = {
  search: "",
  ward: "",
  department: "",
  doctor: "",
};

function App() {
  const [patients, setPatients] = useState([]);
  const [options, setOptions] = useState({
    genders: [],
    wards: [],
    departments: [],
    doctors: [],
    statuses: [],
  });

  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const loadPatients = useCallback(async () => {
    setLoading(true);

    try {
      const data = await patientApi.getPatients(filters);
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const data = await patientApi.getOptions();
        setOptions(data);
      } catch (error) {
        showToast(error.message, "error");
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  function openAddModal() {
    setEditingPatient(null);
    setModalOpen(true);
  }

  function openEditModal(patient) {
    setEditingPatient(patient);
    setModalOpen(true);
  }

  async function handleSavePatient(patientData) {
    setSaving(true);

    try {
      if (editingPatient) {
        await patientApi.updatePatient(
          editingPatient.id,
          patientData
        );
        showToast("Patient details updated successfully.");
      } else {
        await patientApi.createPatient(patientData);
        showToast("Patient admitted successfully.");
      }

      setModalOpen(false);
      setEditingPatient(null);
      await loadPatients();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDischarge(patient) {
    const confirmed = window.confirm(
      `Are you sure you want to discharge ${patient.name}?`
    );

    if (!confirmed) return;

    try {
      await patientApi.dischargePatient(patient.id);
      showToast(`${patient.name} has been discharged.`);
      await loadPatients();
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  async function handleDelete(patient) {
    const confirmed = window.confirm(
      `Permanently delete the record for ${patient.name}?`
    );

    if (!confirmed) return;

    try {
      await patientApi.deletePatient(patient.id);
      showToast("Patient record deleted successfully.");
      await loadPatients();
    } catch (error) {
      showToast(error.message, "error");
    }
  }

  return (
    <div className="app-shell" id="dashboard">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="dashboard-content">
          <div className="welcome-row">
            <div>
              <h2>Overview</h2>
              <p>Monitor and manage hospital patient admissions.</p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={openAddModal}
            >
              <Plus size={19} />
              Add Patient
            </button>
          </div>

          <StatsCards patients={patients} />

          <section className="patient-section" id="patients">
            <div className="section-heading">
              <div>
                <h2>Patient Records</h2>
                <p>View, search, filter and manage patient information.</p>
              </div>

              <button
                type="button"
                className="refresh-button"
                onClick={loadPatients}
                disabled={loading}
                title="Refresh records"
              >
                <RefreshCw
                  size={17}
                  className={loading ? "spin" : ""}
                />
                Refresh
              </button>
            </div>

            <PatientFilters
              filters={filters}
              setFilters={setFilters}
              options={options}
            />

            <div id="admissions" className="admissions-table">
              <PatientTable
                patients={patients}
                loading={loading}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onDischarge={handleDischarge}
              />
            </div>

            <div className="table-footer">
              Showing {patients.length} patient
              {patients.length !== 1 ? "s" : ""}
            </div>
          </section>
        </div>
      </main>

      {modalOpen && (
        <Modal
          title={editingPatient ? "Edit Patient" : "Add New Patient"}
          onClose={() => {
            if (!saving) {
              setModalOpen(false);
              setEditingPatient(null);
            }
          }}
        >
          <PatientForm
            options={options}
            initialData={editingPatient}
            onSubmit={handleSavePatient}
            onCancel={() => {
              setModalOpen(false);
              setEditingPatient(null);
            }}
            saving={saving}
          />
        </Modal>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
