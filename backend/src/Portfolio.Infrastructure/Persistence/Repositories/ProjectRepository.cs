using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Infrastructure.Persistence.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly PortfolioDbContext _ctx;
    public ProjectRepository(PortfolioDbContext ctx) => _ctx = ctx;

    public Task<List<Project>> GetAllAsync(CancellationToken ct = default) =>
        _ctx.Projects.ToListAsync(ct);

    public Task<List<Project>> GetFeaturedAsync(CancellationToken ct = default) =>
        _ctx.Projects.Where(p => p.Featured).ToListAsync(ct);

    public Task<Project?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        _ctx.Projects.FirstOrDefaultAsync(p => p.Id == id, ct);

    public async Task AddAsync(Project project, CancellationToken ct = default)
    {
        _ctx.Projects.Add(project);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(Project project, CancellationToken ct = default)
    {
        _ctx.Projects.Update(project);
        await _ctx.SaveChangesAsync(ct);
    }

    public async Task DeleteAsync(Project project, CancellationToken ct = default)
    {
        _ctx.Projects.Remove(project);
        await _ctx.SaveChangesAsync(ct);
    }
}
