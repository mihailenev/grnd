\restrict dbmate

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: distance_unit; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.distance_unit AS ENUM (
    'KM',
    'MI'
);


--
-- Name: exercise_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.exercise_type AS ENUM (
    'STRENGTH',
    'CARDIO',
    'PLYOMETRIC',
    'ISOMETRIC',
    'MOBILITY',
    'SPORTS'
);


--
-- Name: height_unit; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.height_unit AS ENUM (
    'CM',
    'FT_IN'
);


--
-- Name: intensity_preference; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.intensity_preference AS ENUM (
    'RPE',
    'RIR'
);


--
-- Name: record_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.record_type AS ENUM (
    'WEIGHT',
    'REPS',
    'VOLUME',
    'TIME',
    'DISTANCE',
    'PACE'
);


--
-- Name: set_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.set_type AS ENUM (
    'REGULAR',
    'WARM_UP',
    'DROP_SET',
    'AMRAP',
    'REST_PAUSE'
);


--
-- Name: sex; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.sex AS ENUM (
    'MALE',
    'FEMALE',
    'OTHER'
);


--
-- Name: theme_preference; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.theme_preference AS ENUM (
    'LIGHT',
    'DARK',
    'SYSTEM'
);


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_role AS ENUM (
    'USER',
    'ADMIN'
);


--
-- Name: visibility; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.visibility AS ENUM (
    'PRIVATE',
    'PUBLIC'
);


--
-- Name: weight_unit; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.weight_unit AS ENUM (
    'KG',
    'LB',
    'STONE'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exercise_muscle_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercise_muscle_groups (
    exercise_id uuid NOT NULL,
    muscle_group_id integer NOT NULL,
    activation_level smallint
);


--
-- Name: exercises; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercises (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    name text NOT NULL,
    exercise_type public.exercise_type NOT NULL,
    description text,
    image_url text,
    muscle_category_id integer,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: muscle_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.muscle_categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: muscle_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.muscle_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: muscle_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.muscle_categories_id_seq OWNED BY public.muscle_categories.id;


--
-- Name: muscle_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.muscle_groups (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: muscle_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.muscle_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: muscle_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.muscle_groups_id_seq OWNED BY public.muscle_groups.id;


--
-- Name: personal_records; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personal_records (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    exercise_id uuid,
    workout_session_set_id uuid,
    record_type public.record_type NOT NULL,
    weight numeric,
    reps integer,
    duration_seconds integer,
    distance_meters numeric,
    achieved_at timestamp with time zone DEFAULT now()
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: user_measurements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_measurements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    height_cm numeric,
    weight_kg numeric(5,2),
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_preferences (
    user_id uuid NOT NULL,
    theme public.theme_preference DEFAULT 'SYSTEM'::public.theme_preference,
    weight_unit public.weight_unit DEFAULT 'KG'::public.weight_unit,
    height_unit public.height_unit DEFAULT 'CM'::public.height_unit,
    distance_unit public.distance_unit DEFAULT 'KM'::public.distance_unit,
    intensity_preference public.intensity_preference DEFAULT 'RPE'::public.intensity_preference,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role public.user_role DEFAULT 'USER'::public.user_role NOT NULL,
    is_email_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    date_of_birth date,
    sex public.sex,
    last_login_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: workout_session_exercises; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_session_exercises (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id uuid NOT NULL,
    exercise_id uuid NOT NULL,
    order_index integer,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: workout_session_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_session_sets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_exercise_id uuid NOT NULL,
    set_number integer NOT NULL,
    set_type public.set_type,
    actual_reps integer,
    actual_weight numeric,
    actual_rpe numeric,
    actual_duration_seconds integer,
    actual_distance_meters numeric,
    rest_seconds integer,
    is_completed boolean DEFAULT false,
    was_failure boolean DEFAULT false,
    superset_group integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: workout_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    template_id uuid,
    name text,
    started_at timestamp with time zone,
    finished_at timestamp with time zone,
    notes text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: workout_template; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_template (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    name text NOT NULL,
    is_active boolean DEFAULT true,
    visibility public.visibility DEFAULT 'PRIVATE'::public.visibility,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: workout_template_exercises; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_template_exercises (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    template_id uuid NOT NULL,
    exercise_id uuid NOT NULL,
    order_index integer,
    notes text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: workout_template_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workout_template_sets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    template_exercise_id uuid NOT NULL,
    set_number integer NOT NULL,
    set_type public.set_type,
    min_reps integer,
    max_reps integer,
    target_weight numeric,
    percentage_1rm numeric,
    target_rpe numeric,
    target_duration_seconds integer,
    target_distance_meters numeric,
    rest_seconds integer,
    superset_group integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: muscle_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.muscle_categories ALTER COLUMN id SET DEFAULT nextval('public.muscle_categories_id_seq'::regclass);


--
-- Name: muscle_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.muscle_groups ALTER COLUMN id SET DEFAULT nextval('public.muscle_groups_id_seq'::regclass);


--
-- Name: exercise_muscle_groups exercise_muscle_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise_muscle_groups
    ADD CONSTRAINT exercise_muscle_groups_pkey PRIMARY KEY (exercise_id, muscle_group_id);


--
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (id);


--
-- Name: muscle_categories muscle_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.muscle_categories
    ADD CONSTRAINT muscle_categories_pkey PRIMARY KEY (id);


--
-- Name: muscle_groups muscle_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.muscle_groups
    ADD CONSTRAINT muscle_groups_pkey PRIMARY KEY (id);


--
-- Name: personal_records personal_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_records
    ADD CONSTRAINT personal_records_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: user_measurements user_measurements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_measurements
    ADD CONSTRAINT user_measurements_pkey PRIMARY KEY (id);


--
-- Name: user_preferences user_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_pkey PRIMARY KEY (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: workout_session_exercises workout_session_exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_session_exercises
    ADD CONSTRAINT workout_session_exercises_pkey PRIMARY KEY (id);


--
-- Name: workout_session_sets workout_session_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_session_sets
    ADD CONSTRAINT workout_session_sets_pkey PRIMARY KEY (id);


--
-- Name: workout_sessions workout_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_sessions
    ADD CONSTRAINT workout_sessions_pkey PRIMARY KEY (id);


--
-- Name: workout_template_exercises workout_template_exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template_exercises
    ADD CONSTRAINT workout_template_exercises_pkey PRIMARY KEY (id);


--
-- Name: workout_template workout_template_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template
    ADD CONSTRAINT workout_template_pkey PRIMARY KEY (id);


--
-- Name: workout_template_sets workout_template_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template_sets
    ADD CONSTRAINT workout_template_sets_pkey PRIMARY KEY (id);


--
-- Name: idx_exercises_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_exercises_user ON public.exercises USING btree (user_id);


--
-- Name: idx_pr_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pr_user ON public.personal_records USING btree (user_id);


--
-- Name: idx_session_exercises_session; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_exercises_session ON public.workout_session_exercises USING btree (session_id);


--
-- Name: idx_session_sets_exercise; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_sets_exercise ON public.workout_session_sets USING btree (session_exercise_id);


--
-- Name: idx_sessions_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions_user ON public.workout_sessions USING btree (user_id);


--
-- Name: idx_template_exercises_template; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_template_exercises_template ON public.workout_template_exercises USING btree (template_id);


--
-- Name: idx_user_measurements_user; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_measurements_user ON public.user_measurements USING btree (user_id);


--
-- Name: exercise_muscle_groups exercise_muscle_groups_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise_muscle_groups
    ADD CONSTRAINT exercise_muscle_groups_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;


--
-- Name: exercise_muscle_groups exercise_muscle_groups_muscle_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercise_muscle_groups
    ADD CONSTRAINT exercise_muscle_groups_muscle_group_id_fkey FOREIGN KEY (muscle_group_id) REFERENCES public.muscle_groups(id) ON DELETE CASCADE;


--
-- Name: exercises exercises_muscle_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_muscle_category_id_fkey FOREIGN KEY (muscle_category_id) REFERENCES public.muscle_categories(id);


--
-- Name: exercises exercises_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: personal_records personal_records_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_records
    ADD CONSTRAINT personal_records_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;


--
-- Name: personal_records personal_records_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_records
    ADD CONSTRAINT personal_records_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_measurements user_measurements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_measurements
    ADD CONSTRAINT user_measurements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_preferences user_preferences_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_preferences
    ADD CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: workout_session_exercises workout_session_exercises_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_session_exercises
    ADD CONSTRAINT workout_session_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id);


--
-- Name: workout_session_exercises workout_session_exercises_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_session_exercises
    ADD CONSTRAINT workout_session_exercises_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.workout_sessions(id) ON DELETE CASCADE;


--
-- Name: workout_session_sets workout_session_sets_session_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_session_sets
    ADD CONSTRAINT workout_session_sets_session_exercise_id_fkey FOREIGN KEY (session_exercise_id) REFERENCES public.workout_session_exercises(id) ON DELETE CASCADE;


--
-- Name: workout_sessions workout_sessions_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_sessions
    ADD CONSTRAINT workout_sessions_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.workout_template(id) ON DELETE SET NULL;


--
-- Name: workout_sessions workout_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_sessions
    ADD CONSTRAINT workout_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: workout_template_exercises workout_template_exercises_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template_exercises
    ADD CONSTRAINT workout_template_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id);


--
-- Name: workout_template_exercises workout_template_exercises_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template_exercises
    ADD CONSTRAINT workout_template_exercises_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.workout_template(id) ON DELETE CASCADE;


--
-- Name: workout_template_sets workout_template_sets_template_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template_sets
    ADD CONSTRAINT workout_template_sets_template_exercise_id_fkey FOREIGN KEY (template_exercise_id) REFERENCES public.workout_template_exercises(id) ON DELETE CASCADE;


--
-- Name: workout_template workout_template_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workout_template
    ADD CONSTRAINT workout_template_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20260223091227');
