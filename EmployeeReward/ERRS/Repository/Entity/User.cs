using FastEndpoints;
using FluentValidation;

public class User
{
  public int Id { get; set; }

  public string FirstName { get; set; } = string.Empty;

  public string LastName { get; set; } = string.Empty;

  public string UserName { get; set; } = string.Empty;

  public string Password { get; set; } = string.Empty;

  public string UserType { get; set; } = "employee";

  public string LoginStatus { get; set; } = "pending";

  public int BytePoints { get; set; }

  public int PointsGained { get; set; }
}

public class UserValidator : Validator<User>
{
  public UserValidator()
  {
    RuleFor(x => x.FirstName)
    .NotEmpty()
    .WithMessage("Your Firstname is required");

    RuleFor(x => x.LastName)
    .NotEmpty()
    .WithMessage("Your Lastname is required");

    RuleFor(x => x.UserName)
    .NotEmpty()
    .WithMessage("Your Username is required");

    RuleFor(x => x.Password)
    .NotEmpty()
    .WithMessage("Password is required");
  }
}