using System.ComponentModel.DataAnnotations;
using Microsoft.IdentityModel.Tokens;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Username { get; set; }

    [Required]
    [StringLength(25, MinimumLength = 8)]
    public string Password { get; set; }
}
