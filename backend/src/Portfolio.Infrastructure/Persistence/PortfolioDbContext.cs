using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options) { }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<SiteProfile> SiteProfiles => Set<SiteProfile>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Project>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Title).IsRequired().HasMaxLength(100);
            e.Property(p => p.Description).IsRequired().HasMaxLength(1000);
            e.Property(p => p.TechStack).IsRequired().HasMaxLength(500);
            e.Property(p => p.ImageUrl).HasMaxLength(500);
            e.Property(p => p.LiveUrl).HasMaxLength(200);
            e.Property(p => p.GithubUrl).HasMaxLength(200);
        });

        builder.Entity<Service>(e =>
        {
            e.HasKey(s => s.Id);
            e.Property(s => s.Title).IsRequired().HasMaxLength(100);
            e.Property(s => s.Description).IsRequired().HasMaxLength(500);
            e.Property(s => s.Price).IsRequired().HasMaxLength(50);
            e.Property(s => s.Icon).IsRequired().HasMaxLength(50);
        });

        builder.Entity<Skill>(e =>
        {
            e.HasKey(s => s.Id);
            e.Property(s => s.Name).IsRequired().HasMaxLength(50);
            e.Property(s => s.Category).IsRequired().HasMaxLength(50);
            e.Property(s => s.IconUrl).HasMaxLength(200);
        });

        builder.Entity<Message>(e =>
        {
            e.HasKey(m => m.Id);
            e.Property(m => m.Name).IsRequired().HasMaxLength(100);
            e.Property(m => m.Email).IsRequired().HasMaxLength(200);
            e.Property(m => m.Subject).IsRequired().HasMaxLength(200);
            e.Property(m => m.Body).IsRequired().HasMaxLength(2000);
        });

        builder.Entity<AdminUser>(e =>
        {
            e.HasKey(u => u.Id);
            e.Property(u => u.Email).IsRequired().HasMaxLength(200);
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.PasswordHash).IsRequired().HasMaxLength(500);
        });

        builder.Entity<SiteProfile>(e =>
        {
            e.HasKey(p => p.Id);
            e.Property(p => p.Name).IsRequired().HasMaxLength(100);
            e.Property(p => p.Title).IsRequired().HasMaxLength(200);
            e.Property(p => p.Tagline).IsRequired().HasMaxLength(300);
            e.Property(p => p.Bio1).IsRequired().HasMaxLength(1000);
            e.Property(p => p.Bio2).IsRequired().HasMaxLength(1000);
            e.Property(p => p.GithubUrl).HasMaxLength(300);
            e.Property(p => p.LinkedinUrl).HasMaxLength(300);
            e.Property(p => p.Email).HasMaxLength(200);
            e.Property(p => p.MobileHighlight).HasMaxLength(500);
            e.Property(p => p.BackendHighlight).HasMaxLength(500);
            e.Property(p => p.WebHighlight).HasMaxLength(500);
        });
    }
}
