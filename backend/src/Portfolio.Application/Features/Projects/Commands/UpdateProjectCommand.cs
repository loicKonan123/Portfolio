using FluentValidation;
using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;
using System.Text.Json;

namespace Portfolio.Application.Features.Projects.Commands;

public record UpdateProjectCommand(
    Guid Id,
    string Title,
    string Description,
    List<string> TechStack,
    string? LiveUrl,
    string? GithubUrl,
    bool Featured,
    int DisplayOrder
) : IRequest<ProjectDto>;

public class UpdateProjectValidator : AbstractValidator<UpdateProjectCommand>
{
    public UpdateProjectValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(1000);
    }
}

public class UpdateProjectCommandHandler : IRequestHandler<UpdateProjectCommand, ProjectDto>
{
    private readonly IProjectRepository _repo;
    public UpdateProjectCommandHandler(IProjectRepository repo) => _repo = repo;

    public async Task<ProjectDto> Handle(UpdateProjectCommand request, CancellationToken ct)
    {
        var project = await _repo.GetByIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Project {request.Id} not found");

        project.Update(
            request.Title, request.Description,
            JsonSerializer.Serialize(request.TechStack),
            request.LiveUrl, request.GithubUrl,
            request.Featured, request.DisplayOrder);

        await _repo.UpdateAsync(project, ct);

        return new ProjectDto(
            project.Id, project.Title, project.Description, project.ImageUrl,
            request.TechStack, project.LiveUrl, project.GithubUrl,
            project.Featured, project.DisplayOrder, project.CreatedAt);
    }
}
