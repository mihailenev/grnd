-- migrate:up

-- UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--------------------------------------------------
-- ENUMS
--------------------------------------------------

CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');

CREATE TYPE sex AS ENUM ('MALE', 'FEMALE', 'OTHER');

CREATE TYPE theme_preference AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

CREATE TYPE weight_unit AS ENUM ('KG', 'LB', 'STONE');

CREATE TYPE height_unit AS ENUM ('CM', 'FT_IN');

CREATE TYPE distance_unit AS ENUM ('KM', 'MI');

CREATE TYPE intensity_preference AS ENUM ('RPE', 'RIR');

CREATE TYPE exercise_type AS ENUM ('STRENGTH', 'CARDIO','PLYOMETRIC', 'ISOMETRIC', 'MOBILITY', 'SPORTS');

CREATE TYPE visibility AS ENUM ('PRIVATE', 'PUBLIC');

CREATE TYPE set_type AS ENUM (
    'REGULAR',
    'WARM_UP',
    'DROP_SET',
    'AMRAP',
    'REST_PAUSE'
);

CREATE TYPE record_type AS ENUM (
    'WEIGHT',
    'REPS',
    'VOLUME',
    'TIME',
    'DISTANCE',
    'PACE'
);

--------------------------------------------------
-- USERS
--------------------------------------------------

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'USER',
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    date_of_birth DATE,
    sex sex,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

--------------------------------------------------
-- USER MEASUREMENTS
--------------------------------------------------

CREATE TABLE user_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    height_cm NUMERIC,
    weight_kg NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_user_measurements_user
ON user_measurements(user_id);

--------------------------------------------------
-- USER PREFERENCES
--------------------------------------------------

CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme theme_preference DEFAULT 'SYSTEM',
    weight_unit weight_unit DEFAULT 'KG',
    height_unit height_unit DEFAULT 'CM',
    distance_unit distance_unit DEFAULT 'KM',
    intensity_preference intensity_preference DEFAULT 'RPE',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

--------------------------------------------------
-- MUSCLE STRUCTURE
--------------------------------------------------

CREATE TABLE muscle_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE muscle_groups (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

--------------------------------------------------
-- EXERCISES
--------------------------------------------------

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    exercise_type exercise_type NOT NULL,
    description TEXT,
    image_url TEXT,
    muscle_category_id INT REFERENCES muscle_categories(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_exercises_user
ON exercises(user_id);

--------------------------------------------------
-- EXERCISE MUSCLE GROUPS
--------------------------------------------------

CREATE TABLE exercise_muscle_groups (
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    muscle_group_id INT REFERENCES muscle_groups(id) ON DELETE CASCADE,
    activation_level SMALLINT,
    PRIMARY KEY (exercise_id, muscle_group_id)
);

--------------------------------------------------
-- PERSONAL RECORDS
--------------------------------------------------

CREATE TABLE personal_records ( --best
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    workout_session_set_id UUID,
    record_type record_type NOT NULL,
    weight NUMERIC,
    reps INTEGER,
    duration_seconds INTEGER,
    distance_meters NUMERIC,
    achieved_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_pr_user
ON personal_records(user_id);

--------------------------------------------------
-- WORKOUT TEMPLATES
--------------------------------------------------

CREATE TABLE workout_template (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    visibility visibility DEFAULT 'PRIVATE',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

--------------------------------------------------
-- TEMPLATE EXERCISES
--------------------------------------------------

CREATE TABLE workout_template_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES workout_template(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id),
    order_index INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_template_exercises_template
ON workout_template_exercises(template_id);

--------------------------------------------------
-- TEMPLATE SETS
--------------------------------------------------

CREATE TABLE workout_template_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_exercise_id UUID NOT NULL REFERENCES workout_template_exercises(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,

    set_type set_type,

    min_reps INTEGER,
    max_reps INTEGER,

    target_weight NUMERIC, -- numeric 5,2
    percentage_1rm NUMERIC,
    target_rpe NUMERIC, -- numeric 3,1

    target_duration_seconds INTEGER,
    target_distance_meters NUMERIC,

    rest_seconds INTEGER,
    superset_group INTEGER,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

--------------------------------------------------
-- WORKOUT SESSIONS
--------------------------------------------------

CREATE TABLE workout_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_id UUID REFERENCES workout_template(id) ON DELETE SET NULL,
    name TEXT,
    started_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sessions_user
ON workout_sessions(user_id);

--------------------------------------------------
-- SESSION EXERCISES
--------------------------------------------------

CREATE TABLE workout_session_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id),
    order_index INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_session_exercises_session
ON workout_session_exercises(session_id);

--------------------------------------------------
-- SESSION SETS
--------------------------------------------------

CREATE TABLE workout_session_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_exercise_id UUID NOT NULL REFERENCES workout_session_exercises(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,

    set_type set_type,

    actual_reps INTEGER,
    actual_weight NUMERIC, -- numeric 5,2
    actual_rpe NUMERIC, -- numeric 3,1

    actual_duration_seconds INTEGER,
    actual_distance_meters NUMERIC,

    rest_seconds INTEGER,
    is_completed BOOLEAN DEFAULT FALSE,
    was_failure BOOLEAN DEFAULT FALSE,
    superset_group INTEGER,

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_session_sets_exercise
ON workout_session_sets(session_exercise_id);

-- migrate:down

--------------------------------------------------
-- DROP TABLES (reverse dependency order)
--------------------------------------------------

DROP TABLE IF EXISTS workout_session_sets;
DROP TABLE IF EXISTS workout_session_exercises;
DROP TABLE IF EXISTS workout_sessions;

DROP TABLE IF EXISTS workout_template_sets;
DROP TABLE IF EXISTS workout_template_exercises;
DROP TABLE IF EXISTS workout_template;

DROP TABLE IF EXISTS personal_records;

DROP TABLE IF EXISTS exercise_muscle_groups;
DROP TABLE IF EXISTS exercises;

DROP TABLE IF EXISTS muscle_groups;
DROP TABLE IF EXISTS muscle_categories;

DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS user_measurements;

DROP TABLE IF EXISTS users;

--------------------------------------------------
-- DROP ENUMS
--------------------------------------------------

DROP TYPE IF EXISTS record_type;
DROP TYPE IF EXISTS set_type;
DROP TYPE IF EXISTS visibility;
DROP TYPE IF EXISTS exercise_type;
DROP TYPE IF EXISTS intensity_preference;
DROP TYPE IF EXISTS distance_unit;
DROP TYPE IF EXISTS height_unit;
DROP TYPE IF EXISTS weight_unit;
DROP TYPE IF EXISTS theme_preference;
DROP TYPE IF EXISTS sex;
DROP TYPE IF EXISTS user_role;

--------------------------------------------------
-- DROP EXTENSION
--------------------------------------------------

DROP EXTENSION IF EXISTS "pgcrypto";