export function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

export function getRandomElements<T>(array: T[], count: number) {
  if (count > array.length) {
    throw new Error(
      "Количество элементов для выбора больше, чем размер массива."
    );
  }

  const shuffled = array.slice(); // Создаем копию массива, чтобы не модифицировать оригинальный массив
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Перемешиваем элементы массива
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, count); // Возвращаем первые `count` элементов
}
