using FluentValidation;
using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Entities;
using Portfolio.Domain.Interfaces;
using System.Text.Json;

namespace Portfolio.Application.Features.Projects.Commands;

public record CreateProjectCommand(
    string Title,
    string Description,
    List<string> TechStack,
    string? LiveUrl,
    string? GithubUrl,
    bool Featured = false,
    int DisplayOrder = 0
) : IRequest<ProjectDto>;

public class CreateProjectValidator : AbstractValidator<CreateProjectCommand>
{
    public CreateProjectValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(1000);
        RuleFor(x => x.TechStack).NotNull();
    }
}

public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, ProjectDto>
{
    private readonly IProjectRepository _repo;
    public CreateProjectCommandHandler(IProjectRepository repo) => _repo = repo;

    public async Task<ProjectDto> Handle(CreateProjectCommand request, CancellationToken ct)
    {
        var project = Project.Create(
            request.Title,
            request.Description,
            JsonSerializer.Serialize(request.TechStack),
            request.LiveUrl,
            request.GithubUrl,
            request.Featured,
            request.DisplayOrder);

        await _repo.AddAsync(project, ct);

        return new ProjectDto(
            project.Id, project.Title, project.Description, project.ImageUrl,
            request.TechStack, project.LiveUrl, project.GithubUrl,
            project.Featured, project.DisplayOrder, project.CreatedAt);
    }
}
