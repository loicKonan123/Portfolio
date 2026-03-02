using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface IAdminUserRepository
{
    Task<AdminUser?> GetByEmailAsync(string email, CancellationToken ct = default);
    Task AddAsync(AdminUser user, CancellationToken ct = default);
}
