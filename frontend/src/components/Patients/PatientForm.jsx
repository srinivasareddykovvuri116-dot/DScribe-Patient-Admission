
import { useState } from "react";
import { Save } from "lucide-react";
import { formatLabel, getTodayDate } from "../../utils/formatters";

const emptyForm = {
  name: "",
  age: "",
  gender: "",
  ward: "",
  department: "",
  doctor: "",
  admissionDate: getTodayDate(),
  status: "ADMITTED",
};

export default function PatientForm({
  options,
  initialData,
  onSubmit,
  onCancel,
  saving,
}) {
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    ...initialData,
    age: initialData?.age ?? "",
  }));

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};
    const trimmedName = form.name.trim();

    if (!trimmedName) {
      newErrors.name = "Patient name is required";
    } else if (!/^[\p{L} ]+$/u.test(trimmedName)) {
      newErrors.name = "Use letters and spaces only";
    }

    if (form.age === "" || form.age === null) {
      newErrors.age = "Age is required";
    } else if (
      !Number.isInteger(Number(form.age)) ||
      Number(form.age) < 0 ||
      Number(form.age) > 120
    ) {
      newErrors.age = "Age must be between 0 and 120";
    }

    ["gender", "ward", "department", "doctor", "status"].forEach(
      (field) => {
        if (!form[field]) {
          newErrors[field] = "This field is required";
        }
      }
    );

    if (!form.admissionDate) {
      newErrors.admissionDate = "Admission date is required";
    } else if (form.admissionDate > getTodayDate()) {
      newErrors.admissionDate = "Future dates are not allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function submitForm(event) {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      name: form.name.trim(),
      age: Number(form.age),
    });
  }

  function selectOptions(values = []) {
    return values.map((value) => (
      <option key={value} value={value}>
        {formatLabel(value)}
      </option>
    ));
  }

  function fieldError(name) {
    return errors[name] ? (
      <span className="field-error">{errors[name]}</span>
    ) : null;
  }

  return (
    <form className="patient-form" onSubmit={submitForm}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Patient Name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
            maxLength={100}
          />
          {fieldError("name")}
        </div>

        <div className="form-field">
          <label htmlFor="age">Age *</label>
          <input
            id="age"
            name="age"
            type="number"
            min="0"
            max="120"
            step="1"
            value={form.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
          {fieldError("age")}
        </div>

        <div className="form-field">
          <label htmlFor="gender">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            {selectOptions(options.genders)}
          </select>
          {fieldError("gender")}
        </div>

        <div className="form-field">
          <label htmlFor="ward">Ward *</label>
          <select
            id="ward"
            name="ward"
            value={form.ward}
            onChange={handleChange}
          >
            <option value="">Select ward</option>
            {selectOptions(options.wards)}
          </select>
          {fieldError("ward")}
        </div>

        <div className="form-field">
          <label htmlFor="department">Department *</label>
          <select
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select department</option>
            {selectOptions(options.departments)}
          </select>
          {fieldError("department")}
        </div>

        <div className="form-field">
          <label htmlFor="doctor">Doctor *</label>
          <select
            id="doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
          >
            <option value="">Select doctor</option>
            {selectOptions(options.doctors)}
          </select>
          {fieldError("doctor")}
        </div>

        <div className="form-field">
          <label htmlFor="admissionDate">Admission Date *</label>
          <input
            id="admissionDate"
            name="admissionDate"
            type="date"
            max={getTodayDate()}
            value={form.admissionDate}
            onChange={handleChange}
          />
          {fieldError("admissionDate")}
        </div>

        <div className="form-field">
          <label htmlFor="status">Patient Status *</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            {selectOptions(options.statuses)}
          </select>
          {fieldError("status")}
        </div>
      </div>

      <div className="form-footer">
        <span className="required-note">* Required fields</span>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Patient"}
          </button>
        </div>
      </div>
    </form>
  );
}
