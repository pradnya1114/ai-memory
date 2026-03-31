import React, { useState } from 'react';
import { LevelConfig, Difficulty } from '../types';
import { LEVELS } from '../constants';

interface RegistrationScreenProps {
  onSubmit: (name: string, level: LevelConfig) => void;
}

/* ---------------- INPUT FIELD ---------------- */
interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  isTouched: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  isTouched,
}) => {
  const showError = isTouched && !!error;

  return (
    <div className="relative mb-8">
      <input
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=" "
        className={`block w-full px-3 py-3 text-lg text-white bg-transparent border-0 border-b-2
          ${showError ? 'border-red-500' : 'border-slate-500'}
          focus:outline-none focus:ring-0
          ${showError ? 'focus:border-red-500' : 'focus:border-cyan-400'}
          peer`}
      />

      <label
        htmlFor={id}
        className={`absolute text-lg
          ${showError ? 'text-red-400' : 'text-slate-400'}
          duration-300 transform -translate-y-8 scale-75 top-3 origin-[0]
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-8`}
      >
        {label}
      </label>

      {showError && (
        <p className="absolute -bottom-6 left-0 text-sm text-red-400 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

/* ---------------- REGISTRATION SCREEN ---------------- */
const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<LevelConfig>(LEVELS.EASY);
  const [touched, setTouched] = useState(false);

  const error = !name.trim() ? 'Name is required' : '';
  const isFormValid = !error;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setTouched(true);
      return;
    }

    // ✅ START GAME
    onSubmit(name.trim(), level);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">

        <h2 className="text-4xl font-bold text-center mb-8 text-cyan-300">
          Player Registration
        </h2>

        <form onSubmit={handleSubmit} noValidate>

          {/* NAME */}
          <InputField
            id="name"
            label="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            error={error}
            isTouched={touched}
          />

          {/* DIFFICULTY */}
          <div className="mb-8">
            <label className="block text-sm text-slate-400 mb-2">
              Difficulty
            </label>
            <select
              value={level.id}
              onChange={(e) =>
                setLevel(LEVELS[e.target.value as Difficulty])
              }
              className="w-full bg-black/40 border border-cyan-400 rounded-lg px-4 py-3 text-white"
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg text-lg
              hover:bg-cyan-400 transition disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Start Game
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegistrationScreen;
