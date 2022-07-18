export default function setSpacesInText(str) {
  const chars = [
    "и",
    "в",
    "на",
    "с",
    "к",
    "но",
    "по",
    "за",
    "о",
    "у",
    "об",
    "под",
    "из",
    "не",
    "а",
    "от",
  ];

  const arrText = (str && str.split(" ")) || [];
  let newStr = ``;

  // eslint-disable-next-line
  for (let i = 0; i < arrText.length; i++) {
    if (chars.indexOf(arrText[i].toLowerCase()) !== -1) {
      newStr += `${arrText[i]}&nbsp;`;
    } else {
      newStr += `${arrText[i]} `;
    }
  }

  return newStr;
}
