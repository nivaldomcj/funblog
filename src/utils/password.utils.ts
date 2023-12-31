export const hashPassword = async (password: string) =>
  await Bun.password.hash(password);

export const isMatchPassword = async (password: string, hash: string | null) =>
  await Bun.password.verify(password, hash || '');
