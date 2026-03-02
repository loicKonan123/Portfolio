namespace Portfolio.Application.Common.DTOs;

public record ProjectDto(
    Guid Id,
    string Title,
    string Description,
    string? ImageUrl,
    List<string> TechStack,
    string? LiveUrl,
    string? GithubUrl,
    bool Featured,
    int DisplayOrder,
    DateTime CreatedAt
);
