namespace Portfolio.Application.Common.DTOs;

public record ServiceDto(
    Guid Id,
    string Title,
    string Description,
    string Price,
    string Icon,
    bool Featured,
    int DisplayOrder
);
