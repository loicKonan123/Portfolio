namespace Portfolio.Domain.Entities;

public class Project
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string? ImageUrl { get; private set; }
    public string TechStack { get; private set; } = "[]"; // JSON array
    public string? LiveUrl { get; private set; }
    public string? GithubUrl { get; private set; }
    public bool Featured { get; private set; }
    public int DisplayOrder { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Project() { }

    public static Project Create(
        string title,
        string description,
        string techStack,
        string? liveUrl,
        string? githubUrl,
        bool featured = false,
        int displayOrder = 0)
    {
        return new Project
        {
            Id = Guid.NewGuid(),
            Title = title,
            Description = description,
            TechStack = techStack,
            LiveUrl = liveUrl,
            GithubUrl = githubUrl,
            Featured = featured,
            DisplayOrder = displayOrder,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void Update(
        string title,
        string description,
        string techStack,
        string? liveUrl,
        string? githubUrl,
        bool featured,
        int displayOrder)
    {
        Title = title;
        Description = description;
        TechStack = techStack;
        LiveUrl = liveUrl;
        GithubUrl = githubUrl;
        Featured = featured;
        DisplayOrder = displayOrder;
    }

    public void SetImageUrl(string imageUrl) => ImageUrl = imageUrl;
}
