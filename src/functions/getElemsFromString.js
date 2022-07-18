export default function getElemsFromString(str) {
  const templateDiv = document.createElement("div");
  const result = [];

  templateDiv.innerHTML = str;

  templateDiv.childNodes.forEach((item) => {
    if (item.innerText && item.innerText.replaceAll(`&nbsp;`, "").trim()) {
      result.push(item.innerText);
    }
  });

  return result;
}
