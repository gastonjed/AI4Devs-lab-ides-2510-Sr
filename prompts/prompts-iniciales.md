
# Meta prompt

Esta es la historia de usuario que hay que trabajar:

Añadir Candidato al Sistema

Como reclutador, quiero tener la capacidad de añadir candidatos al sistema ATS,
para que pueda gestionar sus datos y procesos de selección de manera eficiente.

Criterios de Aceptación:

- Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
- Formulario de ingreso de datos: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
- Validación de datos: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
- Carga de documentos: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
- Confirmación de añadido: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
- Errores y manejo de excepciones: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
- Accesibilidad y compatibilidad: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.
Notas:

La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

Tareas Técnicas:
- Implementar la interfaz de usuario para el formulario de añadir candidato.
- Desarrollar el backend necesario para procesar la información ingresada en el formulario.
- Asegurar la seguridad y privacidad de los datos del candidato.

Especificaciones:
- Siempre en ingles, tanto documentacion como preguntas
- Documentar al menos el 80%
- Keep it simple
- Plan first, then ask, finally take action
- Ask me any additional questions
- Ve trackeando todos los prompts en la carpeta ./prompts, con las especificaciones para cada etapa

# Prompt 1

<Inputs>  
`user_story`  
</Inputs>  

<Instructions Structure>  
1. Begin by summarizing the user story and its acceptance criteria from user_story.  
2. Create a multi-phase plan for the assistant to follow, clearly labeled and sequenced.  
3. For each phase, define specific actions the assistant should take.  
4. Emphasize the importance of asking the user clarifying questions before proceeding to implementation.  
5. Instruct the assistant to write all outputs and generated prompts in English.  
6. Require that all generated artifacts (e.g., prompts, code, documentation) be tracked in the `./prompts` folder with clear file naming and content description.  
7. Instruct the assistant to document at least 80% of what it builds and to keep all outputs and solutions simple and intuitive.  
</Instructions Structure>  

<Instructions>  
You are going to implement a feature based on the following user story:  
<user_story>  
${user_story}  
</user_story>  

Start by planning before doing anything else. Follow the steps below carefully and do not skip ahead unless instructed.

### Phase 1: Understand & Decompose

1. Summarize the user story in 3–4 concise bullet points.
2. Break down the acceptance criteria into clear, actionable components.
3. Identify technical and UX risks or unknowns that should be clarified with the user.
4. List any assumptions you're making about the system's current state or architecture.
5. Write these insights in English only.

### Phase 2: Ask

1. Write 3–5 well-formed questions to the user to clarify or confirm key details (e.g. tech stack, data model, file storage policy).
2. Make sure the questions cover edge cases, ambiguous requirements, or integrations.
3. Write the questions inside <questions> tags.
4. Do not proceed to implementation until you receive answers.

### Phase 3: Plan

Once questions are resolved:

1. Define the technical architecture for the feature.
2. Describe how you'll handle:

   * Frontend UI form components
   * Form validation (client-side and server-side)
   * File upload and supported formats
   * Backend endpoints and data persistence
   * Error handling UX
   * Accessibility and browser/device compatibility
3. Use concise documentation and diagrams if needed.

### Phase 4: Generate Prompts & Code

1. For each development step (UI, backend, validation, error handling, etc.), generate a separate prompt that explains the objective and scope.
2. Store each prompt in a clearly named file inside `./prompts`, e.g. `add_candidate_form_ui.txt`.
3. Prompts must be written in English and include technical instructions and constraints.
4. Keep all code and logic simple ("Keep it simple" principle).
5. Ensure all generated components are at least 80% documented.

### Phase 5: Review & Report

1. Once prompts and/or implementation are complete, write a brief report summarizing what was generated.
2. Include links or filenames to all tracked prompts.
3. Confirm coverage of all acceptance criteria.
4. Include a checklist and tick off what’s completed.

### Additional Guidelines:

* All content must be in English.
* Documentation coverage must exceed 80%.
* Do not begin coding or prompt generation until the plan and questions are completed and confirmed.
* Always clarify unclear or risky assumptions with the user.
* Memory bank and specs must be tracked in the `./prompts` folder and named descriptively. These should be as minimal and specific as possible to reduce review time.

Begin at Phase 1. </Instructions>


# Questions and clarifications

    1. File Storage & Management

    Where should uploaded CV files be stored, and what naming/organization strategy should we use?
    Option A: Local filesystem in backend/uploads/ directory with UUID filenames
    Option B: Database as BLOB/BYTEA field
    Option C: Cloud storage (S3, Azure Blob, etc.)
    What's the expected file size limit? (Suggested: 5MB max)

    2. Authentication & Authorization
    Who should be able to add candidates to the system?
    Option A: Public form (no authentication required for MVP)
    Option B: Recruiter login required (need to build auth system first)
    Option C: Simple API key or basic auth for now
    Should we track which recruiter added each candidate?

    3. Education & Work Experience Data Structure
    How should we handle multiple education and work experience entries?
    Option A: Single text fields for education and experience (simple, stored as text)
    Option B: Separate related tables (Education, WorkExperience) with one-to-many relationships (normalized)
    Option C: JSON/JSONB fields in PostgreSQL allowing multiple structured entries
    How many education/experience entries should we support per candidate? (Suggested: 1-5 each)

    4. Form Complexity & User Experience
    What should the form flow look like?
    Option A: Single-page form with all fields visible at once
    Option B: Multi-step wizard (Step 1: Personal Info, Step 2: Education, Step 3: Experience, Step 4: CV Upload)
    Option C: Collapsible sections on one page
    Should education/experience fields be dynamically addable (+ Add Another buttons)?

    5. Validation & Error Handling Specifics
    What level of validation is required beyond basic required fields?
    Phone number format validation? (International formats supported?)
    Address structure (free text vs. structured street/city/state/zip)?
    Education: Specific fields (degree, institution, year) or free text?
    Work Experience: Specific fields (company, title, dates) or free text?
    Should we validate email uniqueness (prevent duplicate candidates)?


Answers

    1. decide it you, keep it as simple as possible.max filesize 5MB
    2. Public form for this MVP, it can be improved later. Track wich recruiter added each candidate
    3. Option A, single text fields
    4. Option A, all fields visible at once
    5. validate characters and format whenever is possible. for instace: phone (numbers only), email (contains at symbol and uniqueness)