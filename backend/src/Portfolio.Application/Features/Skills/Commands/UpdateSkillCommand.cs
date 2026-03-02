using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Skills.Commands;

public record UpdateSkillCommand(Guid Id, string Name, string Category, int Level, string? IconUrl) : IRequest<SkillDto>;

public class UpdateSkillCommandHandler : IRequestHandler<UpdateSkillCommand, SkillDto>
{
    private readonly ISkillRepository _repo;
    public UpdateSkillCommandHandler(ISkillRepository repo) => _repo = repo;

    public async Task<SkillDto> Handle(UpdateSkillCommand request, CancellationToken ct)
    {
        var skill = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Skill {request.Id} not found");
        skill.Update(request.Name, request.Category, request.Level, request.IconUrl);
        await _repo.UpdateAsync(skill, ct);
        return new SkillDto(skill.Id, skill.Name, skill.Category, skill.Level, skill.IconUrl);
    }
}
