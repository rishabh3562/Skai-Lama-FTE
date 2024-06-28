const getInitials = (name) => {
    const words = name.split(' ');
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  export default getInitials;