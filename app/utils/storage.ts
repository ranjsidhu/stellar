const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const setItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserId = () => {
  try {
    const user = getItem("userDetails");
    if (!user) return null;
    return user.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// eslint-disable-next-line import/no-unused-modules
export { getItem, setItem, removeItem, getUserId };
