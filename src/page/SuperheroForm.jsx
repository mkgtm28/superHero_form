import { useState, useActionState } from "react";

async function submitHero(prevState, formData) {
  const heroName = formData.get("heroName");
  const realName = formData.get("realName");
  const powerSource = formData.get("powerSource");
  const powers = formData.getAll("powers");

  if (!heroName || !realName || !powerSource || powers.length === 0) {
    return {
      message: "Please complete all fields!",
    };
  }

  return {
    message: `Congratulations ${heroName}! Your application has been submitted successfully.`,
  };
}

function SuperheroForm() {
  const powerSourceOptions = [
    "Bitten by a strange creature",
    "Radioactive exposure",
    "Science experiment",
    "Alien heritage",
    "Ancient artifact discovery",
    "Other",
  ];

  const powersOptions = [
    "Super Strength",
    "Super Speed",
    "Flight",
    "Invisibility",
    "Telekinesis",
    "Other",
  ];

  const [heroName, setHeroName] = useState("");
  const [realName, setRealName] = useState("");
  const [powerSource, setPowerSource] = useState("");
  const [powers, setPowers] = useState([]);

  const [state, formAction, isPending] = useActionState(submitHero, {
    message: "",
  });

  const handlePowersChange = (e) => {
    const { value, checked } = e.target;
    setPowers((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value),
    );
  };

  return (
    <div className="form-wrap">
      <h2>Superhero Application Form</h2>
      <p>Please complete all fields</p>
      <form action={formAction}>
        <div className="section">
          <label>
            Hero Name
            <input
              type="text"
              name="heroName"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
            />
          </label>
          <label>
            Real Name
            <input
              type="text"
              name="realName"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
            />
          </label>
        </div>
        <label className="section column">
          How did you get your powers?
          <select
            name="powerSource"
            value={powerSource}
            onChange={(e) => setPowerSource(e.target.value)}
          >
            <option value="">Select one</option>
            {powerSourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>
        <label className="section column">
          List your powers (select all that apply):
          {powersOptions.map((power) => (
            <label key={power}>
              <input
                type="checkbox"
                name="powers"
                value={power}
                checked={powers.includes(power)}
                onChange={handlePowersChange}
              />
              <span>{power}</span>
            </label>
          ))}
        </label>
        <button
          className="submit-btn"
          type="submit"
          disabled={
            !heroName.trim() ||
            !realName.trim() ||
            !powerSource ||
            powers.length === 0 ||
            isPending
          }
        >
          {isPending ? "Submitting..." : "Join the League"}
        </button>
        <br />
        {state.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
export default SuperheroForm;
