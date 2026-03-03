using FluentValidation;
using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Profile.Commands;

public record UpdateSiteProfileCommand(
    string Name,
    string Title,
    string Tagline,
    string Bio1,
    string Bio2,
    string GithubUrl,
    string LinkedinUrl,
    string Email,
    string MobileHighlight,
    string BackendHighlight,
    string WebHighlight
) : IRequest<SiteProfileDto>;

public class UpdateSiteProfileValidator : AbstractValidator<UpdateSiteProfileCommand>
{
    public UpdateSiteProfileValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Tagline).NotEmpty().MaximumLength(300);
        RuleFor(x => x.Bio1).NotEmpty().MaximumLength(1000);
        RuleFor(x => x.Bio2).NotEmpty().MaximumLength(1000);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(200);
    }
}

public class UpdateSiteProfileCommandHandler : IRequestHandler<UpdateSiteProfileCommand, SiteProfileDto>
{
    private readonly ISiteProfileRepository _repo;
    public UpdateSiteProfileCommandHandler(ISiteProfileRepository repo) => _repo = repo;

    public async Task<SiteProfileDto> Handle(UpdateSiteProfileCommand request, CancellationToken ct)
    {
        var profile = await _repo.GetAsync(ct);

        if (profile is null)
        {
            profile = Domain.Entities.SiteProfile.Create(
                request.Name, request.Title, request.Tagline,
                request.Bio1, request.Bio2,
                request.GithubUrl, request.LinkedinUrl, request.Email,
                request.MobileHighlight, request.BackendHighlight, request.WebHighlight);
            await _repo.AddAsync(profile, ct);
        }
        else
        {
            profile.Update(
                request.Name, request.Title, request.Tagline,
                request.Bio1, request.Bio2,
                request.GithubUrl, request.LinkedinUrl, request.Email,
                request.MobileHighlight, request.BackendHighlight, request.WebHighlight);
            await _repo.UpdateAsync(profile, ct);
        }

        return new SiteProfileDto(
            profile.Id, profile.Name, profile.Title, profile.Tagline,
            profile.Bio1, profile.Bio2,
            profile.GithubUrl, profile.LinkedinUrl, profile.Email,
            profile.MobileHighlight, profile.BackendHighlight, profile.WebHighlight);
    }
}
