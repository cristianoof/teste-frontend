function getNameInitials(name: string): string {
  const parts = name.trim().split(' ');

  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[parts.length - 1] : '';

  return `${firstName.charAt(0).toUpperCase()}${
    lastName ? lastName.charAt(0).toUpperCase() : ''
  }`;
}

export const stringUtils = {
  getNameInitials,
};
