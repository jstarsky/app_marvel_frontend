import { useCharactersContext } from "./context";

export default function Detail() {
  const { character , setCharacter} = useCharactersContext();
  return (
    <div
      className={["absolute inset-0","bg-white", "data-[ishidden=true]:hidden"]
        .filter(Boolean)
        .join(" ")}
      data-ishidden={character ? "false" : "true"}
    >
      Character Detail
      <button onClick={() => setCharacter(null)}>Close</button>
    </div>
  );
}
