using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public class AdminUserRepository : IAdminUserRepository
{
    private readonly PortfolioDbContext _ctx;
    public AdminUserRepository(PortfolioDbContext ctx) => _ctx = ctx;

    public Task<AdminUser?> GetByEmailAsync(string email, CancellationToken ct = default) =>
        _ctx.AdminUsers.FirstOrDefaultAsync(u => u.Email == email, ct);

    public async Task AddAsync(AdminUser user, CancellationToken ct = default)
    {
        _ctx.AdminUsers.Add(user);
        await _ctx.SaveChangesAsync(ct);
    }
}
