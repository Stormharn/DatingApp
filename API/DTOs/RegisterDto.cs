using System.ComponentModel.DataAnnotations;
using Microsoft.IdentityModel.Tokens;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Username { get; set; }
    [Required] public string KnownAs { get; set; }
    [Required] public string Gender { get; set; }
    [Required] public string InterestedIn { get; set; }
    [Required] public DateOnly? DateOfBirth { get; set; } // optional to make required work!
    [Required] public string City { get; set; }
    [Required] public string State { get; set; }

    [Required]
    [StringLength(25, MinimumLength = 8)]
    public string Password { get; set; }
}
