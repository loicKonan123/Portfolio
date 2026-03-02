namespace Portfolio.Domain.Entities;

public class Message
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string Subject { get; private set; } = string.Empty;
    public string Body { get; private set; } = string.Empty;
    public bool IsRead { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private Message() { }

    public static Message Create(string name, string email, string subject, string body)
    {
        return new Message
        {
            Id = Guid.NewGuid(),
            Name = name,
            Email = email,
            Subject = subject,
            Body = body,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void MarkAsRead() => IsRead = true;
}
