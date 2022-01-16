export default function MakeFirstLetterUP(text) {
  const firstWord = text?.trim().split(" ")[0];
  return firstWord?.split("")[0]?.toUpperCase() + firstWord?.substr(1);
}
