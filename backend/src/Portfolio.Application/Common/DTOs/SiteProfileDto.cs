namespace Portfolio.Application.Common.DTOs;

public record SiteProfileDto(
    Guid Id,
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
);
