import { stringUtils } from './string-utils';

describe('StringUtils', () => {
  describe('getNameInitials', () => {
    it('should return the first letter of the first name when only one name is provided', () => {
      expect(stringUtils.getNameInitials('João')).toBe('J');
    });

    it('should return the first letter of the first and last name when multiple names are provided', () => {
      expect(stringUtils.getNameInitials('João Silva')).toBe('JS');
    });

    it('should handle multiple names and return the first and last initials', () => {
      expect(stringUtils.getNameInitials('João Pedro Silva')).toBe('JS');
    });

    it('should trim whitespace from the name', () => {
      expect(stringUtils.getNameInitials('  João Silva  ')).toBe('JS');
    });

    it('should handle empty string', () => {
      expect(stringUtils.getNameInitials('')).toBe('');
    });

    it('should convert initials to uppercase', () => {
      expect(stringUtils.getNameInitials('joão silva')).toBe('JS');
    });
  });
});
