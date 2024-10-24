"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";

type Group = string[];

export default function Home() {
  const [people, setPeople] = useState<string[]>(["Persona 1", "Persona 2"]);
  const [extractedPerson, setExtractedPerson] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [numGroups, setNumGroups] = useState<number>(2);
  const [groups, setGroups] = useState<Group[]>([]);

  const handleAddPerson = (): void => {
    const trimmedName = inputName.trim();
    if (trimmedName && !people.includes(trimmedName)) {
      setPeople([...people, trimmedName]);
      setInputName("");
    }
  };

  const handleExtractPerson = (): void => {
    if (people.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * people.length);
      const person: string = people[randomIndex];
      setExtractedPerson(person);
    }
  };

  const handleGenerateGroups = (): void => {
    if (numGroups < 1) return;
    const shuffledPeople: string[] = [...people].sort(() => Math.random() - 0.5);
    const generatedGroups: Group[] = Array.from({ length: numGroups }, () => []);

    shuffledPeople.forEach((person: string, index: number) => {
      generatedGroups[index % numGroups].push(person);
    });

    setGroups(generatedGroups);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputName(e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setNumGroups(parseInt(e.target.value, 10));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAddPerson();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 min-h-screen p-10 bg-white">
      <h1 className="text-4xl font-bold text-black">Lista de Personas</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nombre de la persona"
          value={inputName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
        />
        <button
          onClick={handleAddPerson}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Agregar
        </button>
      </div>

      <div className="w-4/5 bg-white p-6 rounded-lg shadow-md border border-black">
        <h2 className="text-2xl font-semibold mb-4 text-black">Personas en la Lista</h2>
        {people.length === 0 ? (
          <p className="text-black">No hay personas en la lista.</p>
        ) : (
          <ul className="space-y-2">
            {people.map((person, index) => (
              <li key={index} className="p-2 border-b border-black text-lg text-black">
                {person}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleExtractPerson}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        disabled={people.length === 0}
      >
        {extractedPerson || "Extraer Persona"}
      </button>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="flex items-center gap-4 w-full">
          <label htmlFor="numGroups" className="text-lg font-medium text-black">
            Número de Grupos:
          </label>
          <select
            id="numGroups"
            value={numGroups}
            onChange={handleSelectChange}
            className="flex-1 px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button
          onClick={handleGenerateGroups}
          className="w-full px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          disabled={people.length === 0}
        >
          Generar Grupos
        </button>
      </div>

      {groups.length > 0 && (
        <div className="w-4/5 bg-white p-6 rounded-lg shadow-md border border-black">
          <h2 className="text-2xl font-semibold mb-4 text-black">Grupos Generados</h2>
          {groups.map((group, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-medium text-black">Grupo {index + 1}</h3>
              {group.length === 0 ? (
                <p className="text-black">No hay personas en este grupo.</p>
              ) : (
                <ul className="list-disc list-inside">
                  {group.map((person, idx) => (
                    <li key={idx} className="text-black">
                      {person}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
