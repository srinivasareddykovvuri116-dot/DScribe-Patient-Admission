
package com.dscribe.patient_admission.dto;

import java.time.LocalDate;

public class PatientResponseDTO {

    private Long id;
    private String name;
    private Integer age;
    private String gender;
    private String ward;
    private String department;
    private String doctor;
    private LocalDate admissionDate;
    private String status;

    public PatientResponseDTO() {
    }

    public PatientResponseDTO(
            Long id,
            String name,
            Integer age,
            String gender,
            String ward,
            String department,
            String doctor,
            LocalDate admissionDate,
            String status) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.ward = ward;
        this.department = department;
        this.doctor = doctor;
        this.admissionDate = admissionDate;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Integer getAge() { return age; }
    public String getGender() { return gender; }
    public String getWard() { return ward; }
    public String getDepartment() { return department; }
    public String getDoctor() { return doctor; }
    public LocalDate getAdmissionDate() { return admissionDate; }
    public String getStatus() { return status; }
}
