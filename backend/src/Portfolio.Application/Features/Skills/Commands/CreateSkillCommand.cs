using FluentValidation;
using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Skills.Commands;

public record CreateSkillCommand(string Name, string Category, int Level, string? IconUrl) : IRequest<SkillDto>;

public class CreateSkillValidator : AbstractValidator<CreateSkillCommand>
{
    public CreateSkillValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Category).NotEmpty().Must(c => new[] { "frontend", "backend", "mobile", "tools" }.Contains(c))
            .WithMessage("Category must be: frontend, backend, mobile or tools");
        RuleFor(x => x.Level).InclusiveBetween(0, 100);
    }
}

public class CreateSkillCommandHandler : IRequestHandler<CreateSkillCommand, SkillDto>
{
    private readonly ISkillRepository _repo;
    public CreateSkillCommandHandler(ISkillRepository repo) => _repo = repo;

    public async Task<SkillDto> Handle(CreateSkillCommand request, CancellationToken ct)
    {
        var skill = Skill.Create(request.Name, request.Category, request.Level, request.IconUrl);
        await _repo.AddAsync(skill, ct);
        return new SkillDto(skill.Id, skill.Name, skill.Category, skill.Level, skill.IconUrl);
    }
}
