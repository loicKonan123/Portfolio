using MediatR;
using Portfolio.Application.Common.DTOs;
using Portfolio.Domain.Interfaces;

namespace Portfolio.Application.Features.Profile.Queries;

public record GetSiteProfileQuery : IRequest<SiteProfileDto?>;

public class GetSiteProfileQueryHandler : IRequestHandler<GetSiteProfileQuery, SiteProfileDto?>
{
    private readonly ISiteProfileRepository _repo;
    public GetSiteProfileQueryHandler(ISiteProfileRepository repo) => _repo = repo;

    public async Task<SiteProfileDto?> Handle(GetSiteProfileQuery request, CancellationToken ct)
    {
        var p = await _repo.GetAsync(ct);
        if (p is null) return null;
        return new SiteProfileDto(
            p.Id, p.Name, p.Title, p.Tagline,
            p.Bio1, p.Bio2,
            p.GithubUrl, p.LinkedinUrl, p.Email,
            p.MobileHighlight, p.BackendHighlight, p.WebHighlight);
    }
}
