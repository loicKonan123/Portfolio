namespace Portfolio.Domain.Entities;

public class AdminUser
{
    public Guid Id { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;

    private AdminUser() { }

    public static AdminUser Create(string email, string passwordHash)
    {
        return new AdminUser
        {
            Id = Guid.NewGuid(),
            Email = email,
            PasswordHash = passwordHash
        };
    }
}
