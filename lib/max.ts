const PROFILE_PATTERN = /^https:\/\/max\.ru\/u\/[\w-]+$/;

/** Единственное место со ссылкой на профиль в MAX. `null`, если значение не похоже на адрес профиля. */
export const maxLink = (() => {
  const value = (
    process.env.NEXT_PUBLIC_MAX_URL ??
    "https://max.ru/u/f9LHodD0cOL3ZxdR2MdBHG-1wve5Qo86kG6e9FnepcXpbeAlAVVOr3iiv8o"
  ).trim();
  return PROFILE_PATTERN.test(value) ? value : null;
})();
