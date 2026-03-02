using MediatR;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Skills.Commands;

public record DeleteSkillCommand(Guid Id) : IRequest;

public class DeleteSkillCommandHandler : IRequestHandler<DeleteSkillCommand>
{
    private readonly ISkillRepository _repo;
    public DeleteSkillCommandHandler(ISkillRepository repo) => _repo = repo;

    public async Task Handle(DeleteSkillCommand request, CancellationToken ct)
    {
        var skill = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Skill {request.Id} not found");
        await _repo.DeleteAsync(skill, ct);
    }
}
