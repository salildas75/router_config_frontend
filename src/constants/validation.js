export const ValidationConstant = {
  bdPhoneNumber: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
  regNumber: /[0-9]+/,
  regCapitalLatter: /[A-Z]+/,
  regSmallAlpha: /[a-z]+/,
  regSpecialChar: /[*@$!#%&()^~{}]+/,
  emailRegx:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const MAX_LENGTH = {
  username: 50,
  password: 20,
  dailyWorkingHr: 24,
  monthlyWorkingHr: 31,
};

export const InputValidation = {
  username: {
    required: { value: true, message: "Enter username" },
    //   pattern: {
    //     value: ValidationConstant.emailRegx,
    //     message: "Enter valid email",
    //   },
  },
  password: {
    required: { value: true, message: "Enter password" },
  },
  dropTest: {
    required: { value: true, message: "Enter drop Test" },
  },
};
