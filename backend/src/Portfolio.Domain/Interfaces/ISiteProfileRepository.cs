using Portfolio.Domain.Entities;

namespace Portfolio.Domain.Interfaces;

public interface ISiteProfileRepository
{
    Task<SiteProfile?> GetAsync(CancellationToken ct = default);
    Task AddAsync(SiteProfile profile, CancellationToken ct = default);
    Task UpdateAsync(SiteProfile profile, CancellationToken ct = default);
}
