import QuoteOfTheDay from "./QuoteOfTheDay";

function Header() {
  return (
    <header>
      <h1>📋 Menedżer Zadań</h1>
      <p>{new Date().toLocaleDateString()}</p>
      <QuoteOfTheDay />
    </header>
  );
}

export default Header;
