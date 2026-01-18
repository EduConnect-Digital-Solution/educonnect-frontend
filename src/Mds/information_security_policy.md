## 1. Purpose

This Information Security Policy outlines the framework of controls and procedures established by EduConnect ("we," "us") to protect the confidentiality, integrity, and availability of all information processed, stored, and transmitted by our Service. Our commitment is to secure our systems and the sensitive data entrusted to us by our clients, particularly student Personally Identifiable Information (PII).

## 2. Scope

This policy applies to all EduConnect employees, contractors, and third-party vendors who have access to our information systems. It covers all data, software, hardware, and network resources associated with the Service.

## 3. Roles and Responsibilities

*   **Management:** Is responsible for endorsing, funding, and supporting the information security program.
*   **Security Officer:** Is responsible for developing, implementing, and maintaining this policy and related security procedures.
*   **All Employees & Contractors:** Are responsible for understanding and adhering to this policy in their daily activities.

## 4. Core Security Controls

### 4.1. Access Control

*   **Principle of Least Privilege:** Users are granted the minimum level of access necessary to perform their job functions.
*   **Unique User IDs:** All users must be uniquely identified. Shared or generic accounts are prohibited.
*   **Password & Authentication:**
    *   All passwords must meet complexity requirements (minimum length, combination of character types).
    *   Multi-Factor Authentication (MFA) is required for all administrative access to production systems.
    *   Passwords for production systems must be rotated regularly.
*   **Session Management:** Inactive sessions on the platform will automatically time out after a defined period.
*   **Access Reviews:** User access rights are reviewed quarterly to ensure they remain appropriate.

### 4.2. Data Encryption

*   **Data in Transit:** All data transmitted between the client (browser) and our servers, and between our internal systems, must be encrypted using strong TLS (Transport Layer Security) protocols (TLS 1.2 or higher).
*   **Data at Rest:** All databases, database backups, and file storage containing sensitive information (such as student or financial data) must be encrypted using industry-standard algorithms (e.g., AES-256).

### 4.3. Network and System Security

*   **Firewalls:** Production environments are protected by firewalls configured to deny all traffic by default, only allowing specific, necessary services.
*   **Vulnerability Management:** We conduct regular vulnerability scans of our network and applications. Critical patches must be applied within a defined timeframe.
*   **System Hardening:** All servers are hardened according to industry best practices to reduce their attack surface. Unnecessary ports, services, and software are disabled.

### 4.4. Incident Response

*   **Incident Response Plan:** We maintain a formal Incident Response Plan that details the procedures for detecting, containing, investigating, and recovering from security incidents.
*   **Notification:** In the event of a data breach involving personal data, we will notify affected Schools and relevant regulatory authorities in accordance with applicable laws.

### 4.5. Business Continuity & Disaster Recovery

*   **Data Backups:** Regular, automated backups of all critical data are performed. Backups are encrypted and stored in a secure, geographically separate location.
*   **Disaster Recovery:** We maintain a Disaster Recovery Plan and test it periodically to ensure we can restore the Service in a timely manner following a major outage.

### 4.6. Vendor Management

All third-party service providers (e.g., cloud hosting, payment gateways) with access to our data are vetted for their security posture and must sign agreements obligating them to adhere to our security standards.

### 4.7. Physical Security

Our service is hosted by a major cloud provider Render, that maintains certified, high-security data centers. We rely on our provider's physical security controls. Access to our physical offices is restricted and monitored.

### 4.8. Security Awareness Training

All employees are required to complete security awareness training upon hiring and annually thereafter.

## 5. Policy Enforcement

Violation of this policy may result in disciplinary action, up to and including termination of employment or contract, and legal action if applicable.

## 6. Policy Review

This policy will be reviewed at least annually, or upon significant changes to our systems or the threat landscape, to ensure its continued effectiveness.
