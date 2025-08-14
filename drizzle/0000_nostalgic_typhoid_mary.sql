CREATE TABLE `body_measurements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`assessment_id` integer NOT NULL,
	`height` real,
	`weight` real,
	`bmi` real,
	`waist_circumference` real,
	`hip_circumference` real,
	`chest_circumference` real,
	`shoulder_width` real,
	`body_fat_percentage` real,
	`muscle_mass` real,
	`body_type` text,
	`posture_type` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`assessment_id`) REFERENCES `constitution_assessments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `constitution_assessments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`assessment_date` text DEFAULT CURRENT_TIMESTAMP,
	`final_constitution` text,
	`confidence_score` real,
	`questionnaire_result` text,
	`questionnaire_score` real,
	`body_measurement_result` text,
	`body_measurement_score` real,
	`face_analysis_result` text,
	`face_analysis_score` real,
	`doctor_notes` text,
	`assessed_by` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `face_analysis` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`assessment_id` integer NOT NULL,
	`front_image` blob,
	`side_image` blob,
	`face_length` real,
	`face_width` real,
	`forehead_width` real,
	`cheekbone_width` real,
	`jaw_width` real,
	`face_shape` text,
	`eye_shape` text,
	`nose_shape` text,
	`mouth_shape` text,
	`ai_analysis_result` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`assessment_id`) REFERENCES `constitution_assessments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `herbs_master` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`scientific_name` text,
	`english_name` text,
	`category` text,
	`properties` text,
	`meridians` text,
	`effects` text,
	`constitution` text,
	`contraindications` text,
	`dosage` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `lifestyle_guides` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`constitution` text NOT NULL,
	`guide_date` text DEFAULT CURRENT_TIMESTAMP,
	`recommended_foods` text,
	`avoided_foods` text,
	`meal_timing` text,
	`cooking_methods` text,
	`recommended_exercises` text,
	`exercise_intensity` text,
	`exercise_duration` text,
	`exercise_frequency` text,
	`sleep_schedule` text,
	`stress_management` text,
	`seasonal_care` text,
	`emotional_care` text,
	`environmental_factors` text,
	`status` text DEFAULT 'active',
	`adherence_score` real,
	`guided_by` text,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text,
	`email` text,
	`birth_date` text,
	`gender` text,
	`address` text,
	`medical_history` text,
	`allergies` text,
	`current_medications` text,
	`emergency_contact` text,
	`emergency_phone` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `prescriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`assessment_id` integer,
	`prescription_date` text DEFAULT CURRENT_TIMESTAMP,
	`constitution` text NOT NULL,
	`prescription_name` text NOT NULL,
	`herbs` text NOT NULL,
	`dosage` text,
	`duration` integer,
	`symptoms` text,
	`treatment_goal` text,
	`status` text DEFAULT 'active',
	`effectiveness_score` real,
	`side_effects` text,
	`patient_feedback` text,
	`prescribed_by` text,
	`notes` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assessment_id`) REFERENCES `constitution_assessments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prescriptions_master` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`constitution` text NOT NULL,
	`category` text,
	`herbs` text NOT NULL,
	`preparation` text,
	`indications` text,
	`contraindications` text,
	`dosage` text,
	`duration` text,
	`notes` text,
	`source` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `questionnaire_responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`assessment_id` integer NOT NULL,
	`question_number` integer NOT NULL,
	`question_category` text,
	`response` integer NOT NULL,
	`response_text` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`assessment_id`) REFERENCES `constitution_assessments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `treatment_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`patient_id` integer NOT NULL,
	`doctor_id` integer NOT NULL,
	`session_date` text DEFAULT CURRENT_TIMESTAMP,
	`session_type` text,
	`chief_complaint` text,
	`present_illness` text,
	`physical_exam` text,
	`diagnosis` text,
	`treatment` text,
	`next_appointment` text,
	`notes` text,
	`status` text DEFAULT 'scheduled',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL,
	`license_number` text,
	`clinic` text,
	`phone` text,
	`role` text DEFAULT 'doctor',
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);