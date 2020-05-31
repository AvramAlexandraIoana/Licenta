using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class skd8742 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LimitationCategories",
                columns: table => new
                {
                    LimitationCategoryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Unit = table.Column<string>(nullable: true),
                    Limit = table.Column<float>(nullable: false),
                    CategoryId = table.Column<string>(nullable: true),
                    CategoryId1 = table.Column<int>(nullable: true),
                    CategoryName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LimitationCategories", x => x.LimitationCategoryId);
                    table.ForeignKey(
                        name: "FK_LimitationCategories_Categories_CategoryId1",
                        column: x => x.CategoryId1,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LimitationCategories_CategoryId1",
                table: "LimitationCategories",
                column: "CategoryId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LimitationCategories");
        }
    }
}
