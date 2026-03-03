using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public class SiteProfileRepository : ISiteProfileRepository
{
    private readonly PortfolioDbContext _ctx;
    public SiteProfileRepository(PortfolioDbContext ctx) => _ctx = ctx;

    public Task<SiteProfile?> GetAsync(CancellationToken ct = default) =>
        _ctx.SiteProfiles.FirstOrDefaultAsync(ct);

    public async Task AddAsync(SiteProfile profile, CancellationToken ct = default)
    {
        _ctx.SiteProfiles.Add(profile);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(SiteProfile profile, CancellationToken ct = default)
    {
        _ctx.SiteProfiles.Update(profile);
        await _ctx.SaveChangesAsync(ct);
    }
}
