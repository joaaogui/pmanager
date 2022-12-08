const date = new Date();

export const todaysTime = () => {
  return date.toLocaleTimeString("pt-BR", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
};
export const todaysDate = (weekDay = false) => {
  const weekDays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  return weekDay
    ? weekDays[date.getDay()]
    : date.toLocaleDateString("pt-BR", {});
};
