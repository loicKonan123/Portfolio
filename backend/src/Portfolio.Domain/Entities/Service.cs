namespace Portfolio.Domain.Entities;

public class Service
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string Price { get; private set; } = string.Empty;
    public string Icon { get; private set; } = string.Empty;
    public bool Featured { get; private set; }
    public int DisplayOrder { get; private set; }

    private Service() { }

    public static Service Create(string title, string description, string price, string icon, bool featured = false, int displayOrder = 0)
    {
        return new Service
        {
            Id = Guid.NewGuid(),
            Title = title,
            Description = description,
            Price = price,
            Icon = icon,
            Featured = featured,
            DisplayOrder = displayOrder
        };
    }

    public void Update(string title, string description, string price, string icon, bool featured, int displayOrder)
    {
        Title = title;
        Description = description;
        Price = price;
        Icon = icon;
        Featured = featured;
        DisplayOrder = displayOrder;
    }
}
