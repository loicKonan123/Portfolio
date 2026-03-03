using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSiteProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SiteProfiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Tagline = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Bio1 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Bio2 = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    GithubUrl = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    LinkedinUrl = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    MobileHighlight = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    BackendHighlight = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    WebHighlight = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteProfiles", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SiteProfiles");
        }
    }
}
