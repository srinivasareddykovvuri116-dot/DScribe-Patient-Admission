
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
  } catch {
    throw new Error(
      "Cannot connect to the server. Make sure the Spring Boot backend is running."
    );
  }

  // DELETE and other requests may return an empty response.
  if (response.status === 204) {
    return null;
  }

  const responseText = await response.text();

  let data = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }
  }

  if (!response.ok) {
    const errorMessages = data?.errors
      ? Object.values(data.errors).join(", ")
      : null;

    throw new Error(
      errorMessages ||
        data?.message ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

export const patientApi = {
  // Fetch dropdown options from the backend.
  getOptions() {
    return request("/patients/options");
  },

  // Fetch patients with optional filters and search.
  getPatients(filters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });

    const queryString = params.toString();

    return request(
      `/patients${queryString ? `?${queryString}` : ""}`
    );
  },

  // Add a new patient.
  createPatient(patientData) {
    return request("/patients", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  },

  // Update an existing patient.
  updatePatient(id, patientData) {
    return request(`/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(patientData),
    });
  },

  // Mark a patient as discharged.
  dischargePatient(id) {
    return request(`/patients/${id}/discharge`, {
      method: "PATCH",
    });
  },

  // Delete a patient.
  deletePatient(id) {
    return request(`/patients/${id}`, {
      method: "DELETE",
    });
  },
};
