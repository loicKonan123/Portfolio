using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public class ServiceRepository : IServiceRepository
{
    private readonly PortfolioDbContext _ctx;
    public ServiceRepository(PortfolioDbContext ctx) => _ctx = ctx;

    public Task<List<Service>> GetAllAsync(CancellationToken ct = default) =>
        _ctx.Services.ToListAsync(ct);

    public Task<Service?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        _ctx.Services.FirstOrDefaultAsync(s => s.Id == id, ct);

    public async Task AddAsync(Service service, CancellationToken ct = default)
    {
        _ctx.Services.Add(service);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Service service, CancellationToken ct = default)
    {
        _ctx.Services.Update(service);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Service service, CancellationToken ct = default)
    {
        _ctx.Services.Remove(service);
        await _ctx.SaveChangesAsync(ct);
    }
}
