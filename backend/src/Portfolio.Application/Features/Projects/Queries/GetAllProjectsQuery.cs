using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;
using System.Text.Json;

namespace Portfolio.Application.Features.Projects.Queries;

public record GetAllProjectsQuery : IRequest<List<ProjectDto>>;

public class GetAllProjectsQueryHandler : IRequestHandler<GetAllProjectsQuery, List<ProjectDto>>
{
    private readonly IProjectRepository _repo;
    public GetAllProjectsQueryHandler(IProjectRepository repo) => _repo = repo;

    public async Task<List<ProjectDto>> Handle(GetAllProjectsQuery request, CancellationToken ct)
    {
        var projects = await _repo.GetAllAsync(ct);
        return projects
            .OrderBy(p => p.DisplayOrder)
            .Select(p => new ProjectDto(
                p.Id, p.Title, p.Description, p.ImageUrl,
                JsonSerializer.Deserialize<List<string>>(p.TechStack) ?? [],
                p.LiveUrl, p.GithubUrl, p.Featured, p.DisplayOrder, p.CreatedAt))
            .ToList();
    }
}
