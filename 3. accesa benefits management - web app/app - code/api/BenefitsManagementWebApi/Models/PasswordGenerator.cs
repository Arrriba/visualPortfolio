using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitsManagementWebApi.Models
{
    public class PasswordGenerator
    {
        public bool requireDigit { get; set; }
        
        public bool requireUppercase { get; set; }

        public bool requireLowercase { get; set; }

        public bool requireNonAlphanumeric { get; set; }

        public int requireUniqueChars { get; set; }

        public int requireLength { get; set; }

        public PasswordGenerator(bool Digit, bool Uppercase, bool Lowercase, bool NonAlphanumeric,int UniqueChars, int Length)
        {
            requireDigit = Digit;

            Uppercase = requireUppercase;

            Lowercase = requireLowercase;

            NonAlphanumeric = requireNonAlphanumeric;

            UniqueChars = requireUniqueChars; 

            Length = requireLength;

        }
    }
}
