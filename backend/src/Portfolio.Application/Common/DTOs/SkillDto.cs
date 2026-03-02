namespace Portfolio.Application.Common.DTOs;

public record SkillDto(
    Guid Id,
    string Name,
    string Category,
    int Level,
    string? IconUrl
);
