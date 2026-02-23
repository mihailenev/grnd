import type { ColumnType } from "kysely";

export type DistanceUnit = "KM" | "MI";

export type ExerciseType =
  | "CARDIO"
  | "ISOMETRIC"
  | "MOBILITY"
  | "PLYOMETRIC"
  | "SPORTS"
  | "STRENGTH";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type HeightUnit = "CM" | "FT_IN";

export type IntensityPreference = "RIR" | "RPE";

export type Numeric = ColumnType<string, number | string, number | string>;

export type RecordType =
  | "DISTANCE"
  | "PACE"
  | "REPS"
  | "TIME"
  | "VOLUME"
  | "WEIGHT";

export type SetType =
  | "AMRAP"
  | "DROP_SET"
  | "REGULAR"
  | "REST_PAUSE"
  | "WARM_UP";

export type Sex = "FEMALE" | "MALE" | "OTHER";

export type ThemePreference = "DARK" | "LIGHT" | "SYSTEM";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserRole = "ADMIN" | "USER";

export type Visibility = "PRIVATE" | "PUBLIC";

export type WeightUnit = "KG" | "LB" | "STONE";

export interface ExerciseMuscleGroups {
  activation_level: number | null;
  exercise_id: string;
  muscle_group_id: number;
}

export interface Exercises {
  created_at: Generated<Timestamp | null>;
  description: string | null;
  exercise_type: ExerciseType;
  id: Generated<string>;
  image_url: string | null;
  muscle_category_id: number | null;
  name: string;
  user_id: string | null;
}

export interface MuscleCategories {
  id: Generated<number>;
  name: string;
}

export interface MuscleGroups {
  id: Generated<number>;
  name: string;
}

export interface PersonalRecords {
  achieved_at: Generated<Timestamp | null>;
  distance_meters: Numeric | null;
  duration_seconds: number | null;
  exercise_id: string | null;
  id: Generated<string>;
  record_type: RecordType;
  reps: number | null;
  user_id: string;
  weight: Numeric | null;
  workout_session_set_id: string | null;
}

export interface SchemaMigrations {
  version: string;
}

export interface UserMeasurements {
  created_at: Generated<Timestamp | null>;
  height_cm: Numeric | null;
  id: Generated<string>;
  user_id: string;
  weight_kg: Numeric | null;
}

export interface UserPreferences {
  created_at: Generated<Timestamp | null>;
  distance_unit: Generated<DistanceUnit | null>;
  height_unit: Generated<HeightUnit | null>;
  intensity_preference: Generated<IntensityPreference | null>;
  theme: Generated<ThemePreference | null>;
  updated_at: Generated<Timestamp | null>;
  user_id: string;
  weight_unit: Generated<WeightUnit | null>;
}

export interface Users {
  created_at: Generated<Timestamp | null>;
  date_of_birth: Timestamp | null;
  email: string;
  id: Generated<string>;
  is_active: Generated<boolean | null>;
  is_email_verified: Generated<boolean | null>;
  last_login_at: Timestamp | null;
  password_hash: string;
  role: Generated<UserRole>;
  sex: Sex | null;
  updated_at: Generated<Timestamp | null>;
}

export interface WorkoutSessionExercises {
  created_at: Generated<Timestamp | null>;
  exercise_id: string;
  id: Generated<string>;
  notes: string | null;
  order_index: number | null;
  session_id: string;
  updated_at: Generated<Timestamp | null>;
}

export interface WorkoutSessions {
  created_at: Generated<Timestamp | null>;
  finished_at: Timestamp | null;
  id: Generated<string>;
  name: string | null;
  notes: string | null;
  started_at: Timestamp | null;
  template_id: string | null;
  user_id: string;
}

export interface WorkoutSessionSets {
  actual_distance_meters: Numeric | null;
  actual_duration_seconds: number | null;
  actual_reps: number | null;
  actual_rpe: Numeric | null;
  actual_weight: Numeric | null;
  created_at: Generated<Timestamp | null>;
  id: Generated<string>;
  is_completed: Generated<boolean | null>;
  rest_seconds: number | null;
  session_exercise_id: string;
  set_number: number;
  set_type: SetType | null;
  superset_group: number | null;
  updated_at: Generated<Timestamp | null>;
  was_failure: Generated<boolean | null>;
}

export interface WorkoutTemplate {
  created_at: Generated<Timestamp | null>;
  id: Generated<string>;
  is_active: Generated<boolean | null>;
  name: string;
  updated_at: Generated<Timestamp | null>;
  user_id: string | null;
  visibility: Generated<Visibility | null>;
}

export interface WorkoutTemplateExercises {
  created_at: Generated<Timestamp | null>;
  exercise_id: string;
  id: Generated<string>;
  notes: string | null;
  order_index: number | null;
  template_id: string;
}

export interface WorkoutTemplateSets {
  created_at: Generated<Timestamp | null>;
  id: Generated<string>;
  max_reps: number | null;
  min_reps: number | null;
  percentage_1rm: Numeric | null;
  rest_seconds: number | null;
  set_number: number;
  set_type: SetType | null;
  superset_group: number | null;
  target_distance_meters: Numeric | null;
  target_duration_seconds: number | null;
  target_rpe: Numeric | null;
  target_weight: Numeric | null;
  template_exercise_id: string;
  updated_at: Generated<Timestamp | null>;
}

export interface Database {
  exercise_muscle_groups: ExerciseMuscleGroups;
  exercises: Exercises;
  muscle_categories: MuscleCategories;
  muscle_groups: MuscleGroups;
  personal_records: PersonalRecords;
  schema_migrations: SchemaMigrations;
  user_measurements: UserMeasurements;
  user_preferences: UserPreferences;
  users: Users;
  workout_session_exercises: WorkoutSessionExercises;
  workout_session_sets: WorkoutSessionSets;
  workout_sessions: WorkoutSessions;
  workout_template: WorkoutTemplate;
  workout_template_exercises: WorkoutTemplateExercises;
  workout_template_sets: WorkoutTemplateSets;
}
