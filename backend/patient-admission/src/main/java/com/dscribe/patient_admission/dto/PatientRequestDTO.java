
package com.dscribe.patient_admission.dto;

import com.dscribe.patient_admission.enums.*;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class PatientRequestDTO {

    @NotBlank(message = "Patient name is required")
    @Pattern(
        regexp = "^[\\p{L} ]+$",
        message = "Patient name must contain only letters and spaces"
    )
    private String name;

    @NotNull(message = "Age is required")
    @Min(value = 0, message = "Age cannot be less than 0")
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotNull(message = "Ward is required")
    private Ward ward;

    @NotNull(message = "Department is required")
    private Department department;

    @NotNull(message = "Doctor is required")
    private Doctor doctor;

    @NotNull(message = "Admission date is required")
    @PastOrPresent(message = "Admission date cannot be in the future")
    private LocalDate admissionDate;

    @NotNull(message = "Patient status is required")
    private PatientStatus status;

    public PatientRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public PatientStatus getStatus() {
        return status;
    }

    public void setStatus(PatientStatus status) {
        this.status = status;
    }
}
