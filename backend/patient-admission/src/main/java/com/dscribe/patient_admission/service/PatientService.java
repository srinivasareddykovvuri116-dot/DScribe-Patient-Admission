
package com.dscribe.patient_admission.service;

import com.dscribe.patient_admission.dto.PatientRequestDTO;
import com.dscribe.patient_admission.dto.PatientResponseDTO;
import com.dscribe.patient_admission.entity.Patient;
import com.dscribe.patient_admission.repository.PatientRepository;
import com.dscribe.patient_admission.exception.ResourceNotFoundException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Create a patient
    public PatientResponseDTO createPatient(PatientRequestDTO dto) {

        Patient patient = new Patient();
        mapDTOToEntity(dto, patient);

        Patient savedPatient = patientRepository.save(patient);

        return mapEntityToDTO(savedPatient);
    }

    // Get all patients with optional filters and search
    public List<PatientResponseDTO> getPatients(
            String ward,
            String department,
            String doctor,
            String search) {

        Specification<Patient> specification =
                (root, query, criteriaBuilder) ->
                        criteriaBuilder.conjunction();

        if (ward != null && !ward.isBlank()) {
            specification = specification.and(
                    (root, query, cb) ->
                            cb.equal(root.get("ward"), ward)
            );
        }

        if (department != null && !department.isBlank()) {
            specification = specification.and(
                    (root, query, cb) ->
                            cb.equal(root.get("department"), department)
            );
        }

        if (doctor != null && !doctor.isBlank()) {
            specification = specification.and(
                    (root, query, cb) ->
                            cb.equal(root.get("doctor"), doctor)
            );
        }

        if (search != null && !search.isBlank()) {
            String searchPattern =
                    "%" + search.trim().toLowerCase() + "%";

            specification = specification.and(
                    (root, query, cb) ->
                            cb.like(
                                    cb.lower(root.get("name")),
                                    searchPattern
                            )
            );
        }

        return patientRepository.findAll(specification)
                .stream()
                .map(this::mapEntityToDTO)
                .toList();
    }

    // Get one patient by ID
    public PatientResponseDTO getPatientById(Long id) {

        Patient patient = findPatient(id);

        return mapEntityToDTO(patient);
    }

    // Update patient details
    public PatientResponseDTO updatePatient(
            Long id,
            PatientRequestDTO dto) {

        Patient patient = findPatient(id);

        mapDTOToEntity(dto, patient);

        Patient updatedPatient = patientRepository.save(patient);

        return mapEntityToDTO(updatedPatient);
    }

    // Mark patient as discharged
    public PatientResponseDTO dischargePatient(Long id) {

        Patient patient = findPatient(id);

        patient.setStatus("DISCHARGED");

        Patient updatedPatient = patientRepository.save(patient);

        return mapEntityToDTO(updatedPatient);
    }

    // Delete patient
    public void deletePatient(Long id) {

        Patient patient = findPatient(id);

        patientRepository.delete(patient);
    }

    // Find patient or throw an exception
    private Patient findPatient(Long id) {

        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with ID: " + id
                        )
                );
    }

    // Convert request DTO into database entity
    private void mapDTOToEntity(
            PatientRequestDTO dto,
            Patient patient) {

        patient.setName(dto.getName().trim());
        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender().name());
        patient.setWard(dto.getWard().name());
        patient.setDepartment(dto.getDepartment().name());
        patient.setDoctor(dto.getDoctor().name());
        patient.setAdmissionDate(dto.getAdmissionDate());
        patient.setStatus(dto.getStatus().name());
    }

    // Convert database entity into response DTO
    private PatientResponseDTO mapEntityToDTO(Patient patient) {

        return new PatientResponseDTO(
                patient.getId(),
                patient.getName(),
                patient.getAge(),
                patient.getGender(),
                patient.getWard(),
                patient.getDepartment(),
                patient.getDoctor(),
                patient.getAdmissionDate(),
                patient.getStatus()
        );
    }
}
