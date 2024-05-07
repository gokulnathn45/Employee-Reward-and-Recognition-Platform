using FastEndpoints;
using ERRS.EndPoints;

using ServiceLayer.IService;
namespace ERRS.EndPoints.LoginEnpoints;
public class Login : Endpoint<UserLoginDto, User>
{
  private readonly IUserService _userService;

  public Login(IUserService userService)
  {
    _userService = userService;
  }

  public override void Configure()
  {
    Post("login/loginendpoint");
    AllowAnonymous();
  }

  public override async Task HandleAsync(UserLoginDto logindto, CancellationToken ct)
  {
    var result = await _userService.UserLoginAsync(logindto, ct);

    if (result.IsSuccess)
    {
      await SendAsync(result.Value);
    }
    else
    {
      result.ValidationErrors.ToList().ForEach(e =>
            this.ValidationFailures.Add(new(e.Identifier, e.ErrorMessage)));

      await this.HttpContext.Response.SendErrorsAsync(this.ValidationFailures);
    }
  }}