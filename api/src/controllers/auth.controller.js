export const signUp = (req, res, next) => {
  try {
    res.send({ message: "signed up successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = (req, res, next) => {
  try {
    res.send({ message: "signed in successfully" });
  } catch (error) {
    next(error);
  }
};
