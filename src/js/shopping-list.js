// Змінна, яка буде в собі зберігати данні про кліента
export const shopping_info = JSON.parse(
  localStorage.getItem('client-info')
) || {
  theme: 'light',
  shopping_list: {},
};

export function saveShoppingList() {
  localStorage.setItem('client-info', JSON.stringify(shopping_info));
}
