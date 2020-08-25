export function formatMoney(value) {
  let val = (value / 1).toFixed(0).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function toggleScrollBody(addRemoveClass, className) {
  const el = document.body;
  if (addRemoveClass === "addClass") {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};
