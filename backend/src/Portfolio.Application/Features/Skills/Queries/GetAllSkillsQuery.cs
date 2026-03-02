using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Skills.Queries;

public record GetAllSkillsQuery : IRequest<List<SkillDto>>;

public class GetAllSkillsQueryHandler : IRequestHandler<GetAllSkillsQuery, List<SkillDto>>
{
    private readonly ISkillRepository _repo;
    public GetAllSkillsQueryHandler(ISkillRepository repo) => _repo = repo;

    public async Task<List<SkillDto>> Handle(GetAllSkillsQuery request, CancellationToken ct)
    {
        var skills = await _repo.GetAllAsync(ct);
        return skills
            .Select(s => new SkillDto(s.Id, s.Name, s.Category, s.Level, s.IconUrl))
            .ToList();
    }
}
