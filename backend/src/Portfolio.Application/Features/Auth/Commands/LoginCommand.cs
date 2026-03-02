using FluentValidation;
using MediatR;
using Portfolio.Application.Common.Interfaces;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Auth.Commands;

public record LoginCommand(string Email, string Password) : IRequest<string>;

public class LoginValidator : AbstractValidator<LoginCommand>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public interface IJwtService
{
    string GenerateToken(string userId, string email);
}

public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IAdminUserRepository _repo;
    private readonly IJwtService _jwt;
    private readonly IPasswordHasher _hasher;

    public LoginCommandHandler(IAdminUserRepository repo, IJwtService jwt, IPasswordHasher hasher)
    {
        _repo = repo;
        _jwt = jwt;
        _hasher = hasher;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken ct)
    {
        var user = await _repo.GetByEmailAsync(request.Email, ct)
            ?? throw new UnauthorizedAccessException("Invalid credentials");

        if (!_hasher.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        return _jwt.GenerateToken(user.Id.ToString(), user.Email);
    }
}
