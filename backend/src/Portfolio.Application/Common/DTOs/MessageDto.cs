namespace Portfolio.Application.Common.DTOs;

public record MessageDto(
    Guid Id,
    string Name,
    string Email,
    string Subject,
    string Body,
    bool IsRead,
    DateTime CreatedAt
);
