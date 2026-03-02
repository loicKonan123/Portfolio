namespace Portfolio.Domain.Entities;

public class Skill
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Category { get; private set; } = string.Empty; // frontend | backend | mobile | tools
    public int Level { get; private set; } // 0-100
    public string? IconUrl { get; private set; }

    private Skill() { }

    public static Skill Create(string name, string category, int level, string? iconUrl = null)
    {
        return new Skill
        {
            Id = Guid.NewGuid(),
            Name = name,
            Category = category,
            Level = level,
            IconUrl = iconUrl
        };
    }

    public void Update(string name, string category, int level, string? iconUrl)
    {
        Name = name;
        Category = category;
        Level = level;
        IconUrl = iconUrl;
    }
}
