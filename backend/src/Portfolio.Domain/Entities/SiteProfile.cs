namespace Portfolio.Domain.Entities;

public class SiteProfile
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = "";
    public string Title { get; private set; } = "";
    public string Tagline { get; private set; } = "";
    public string Bio1 { get; private set; } = "";
    public string Bio2 { get; private set; } = "";
    public string GithubUrl { get; private set; } = "";
    public string LinkedinUrl { get; private set; } = "";
    public string Email { get; private set; } = "";
    public string MobileHighlight { get; private set; } = "";
    public string BackendHighlight { get; private set; } = "";
    public string WebHighlight { get; private set; } = "";

    private SiteProfile() { }

    public static SiteProfile Create(
        string name, string title, string tagline,
        string bio1, string bio2,
        string githubUrl, string linkedinUrl, string email,
        string mobileHighlight, string backendHighlight, string webHighlight)
    {
        return new SiteProfile
        {
            Id = Guid.NewGuid(),
            Name = name, Title = title, Tagline = tagline,
            Bio1 = bio1, Bio2 = bio2,
            GithubUrl = githubUrl, LinkedinUrl = linkedinUrl, Email = email,
            MobileHighlight = mobileHighlight,
            BackendHighlight = backendHighlight,
            WebHighlight = webHighlight,
        };
    }

    public void Update(
        string name, string title, string tagline,
        string bio1, string bio2,
        string githubUrl, string linkedinUrl, string email,
        string mobileHighlight, string backendHighlight, string webHighlight)
    {
        Name = name; Title = title; Tagline = tagline;
        Bio1 = bio1; Bio2 = bio2;
        GithubUrl = githubUrl; LinkedinUrl = linkedinUrl; Email = email;
        MobileHighlight = mobileHighlight;
        BackendHighlight = backendHighlight;
        WebHighlight = webHighlight;
    }
}
