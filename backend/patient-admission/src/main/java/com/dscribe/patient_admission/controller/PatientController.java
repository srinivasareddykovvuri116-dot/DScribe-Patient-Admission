
package com.dscribe.patient_admission.controller;

import com.dscribe.patient_admission.dto.PatientRequestDTO;
import com.dscribe.patient_admission.dto.PatientResponseDTO;
import com.dscribe.patient_admission.enums.Gender;
import com.dscribe.patient_admission.enums.Ward;
import com.dscribe.patient_admission.enums.Department;
import com.dscribe.patient_admission.enums.Doctor;
import com.dscribe.patient_admission.enums.PatientStatus;
import com.dscribe.patient_admission.service.PatientService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // Create a new patient
    @PostMapping
    public ResponseEntity<PatientResponseDTO> createPatient(
            @Valid @RequestBody PatientRequestDTO dto) {

        PatientResponseDTO createdPatient =
                patientService.createPatient(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdPatient);
    }

    // Get all patients, with optional filters and search
    @GetMapping
    public ResponseEntity<List<PatientResponseDTO>> getPatients(
            @RequestParam(required = false) String ward,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String doctor,
            @RequestParam(required = false) String search) {

        return ResponseEntity.ok(
                patientService.getPatients(
                        ward, department, doctor, search
                )
        );
    }

    // Get dropdown options for the frontend
    @GetMapping("/options")
    public ResponseEntity<Map<String, List<String>>> getOptions() {

        Map<String, List<String>> options = Map.of(
                "genders",
                java.util.Arrays.stream(Gender.values())
                        .map(Enum::name).toList(),

                "wards",
                java.util.Arrays.stream(Ward.values())
                        .map(Enum::name).toList(),

                "departments",
                java.util.Arrays.stream(Department.values())
                        .map(Enum::name).toList(),

                "doctors",
                java.util.Arrays.stream(Doctor.values())
                        .map(Enum::name).toList(),

                "statuses",
                java.util.Arrays.stream(PatientStatus.values())
                        .map(Enum::name).toList()
        );

        return ResponseEntity.ok(options);
    }

    // Get patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> getPatientById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                patientService.getPatientById(id)
        );
    }

    // Update patient
    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDTO dto) {

        return ResponseEntity.ok(
                patientService.updatePatient(id, dto)
        );
    }

    // Discharge patient
    @PatchMapping("/{id}/discharge")
    public ResponseEntity<PatientResponseDTO> dischargePatient(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                patientService.dischargePatient(id)
        );
    }

    // Delete patient
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(
            @PathVariable Long id) {

        patientService.deletePatient(id);

        return ResponseEntity.noContent().build();
    }
}
